<script type="typescript">
  import { initUserAudio, getDataArray, stopUserAudio } from "../services/audio";
  import SegmentDisplay from './SegmentDisplay.svelte';
  import * as Comlink from 'comlink';
  import type {IcalcluteNote, ICalculateNoteConstructur} from '../interfaces/calcluteNote';

  let analyserNode: AnalyserNode = null;
  let sampleRate: number;
  let interval: number = null;
  let worker: Worker;
  let note: string;
  let frequency: number;
  let cent: number;
  let calculateNote: Comlink.Remote<IcalcluteNote>;
  let running: boolean;

  const analyse = async () => {
    if (running) return;
    if (!analyserNode) return;
    if (!worker) return;
    const dataArray = getDataArray(analyserNode);
    if (!dataArray) return;
    running = true;
    await calculateNote.calculate(dataArray, sampleRate);
    note = await calculateNote.note;
    frequency = await calculateNote.frequency;
    cent = await calculateNote.cent;
    running = false;
  };

  const click = async () => {
		if (analyserNode) return reset();
    ({ analyserNode, sampleRate } = await initUserAudio());
    initWorker();
		interval = setInterval(analyse, 250);
	};
  
  const initWorker = async () => {
    if (worker) return;
    worker = new Worker('/build/calculateNote.esm.js');
    const CalculateNote: Comlink.Remote<ICalculateNoteConstructur> = Comlink.wrap(worker);
    calculateNote = await new CalculateNote();
  }
	const reset = () => {
    analyserNode = null;
    stopUserAudio();
    clearInterval(interval);
	}
</script>

<main class="flex">

  <!-- HERE: cents leds -->

  <span>
    We are 
    {#if cent}
      {cent}
    {:else}
      --
    {/if}
    off
  </span>
  
  <SegmentDisplay {note}/>
  
  <span>
    Frequency:  
    {#if frequency}
      {frequency}
    {:else}
      --
    {/if}
  </span>
	
	<button on:click={click}>
		{#if analyserNode}
			stop
		{:else}
			start
		{/if}
	</button>
</main>

<style>
  main {
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 320px;
    height: 320px;
    background-color: black;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

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
  let buttonActive: boolean;

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
    buttonActive = true;
    setTimeout(() => {buttonActive = false;}, 300)
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
  
  <SegmentDisplay {note} isOn={!!analyserNode} />
  
  <span>
    Frequency:  
    {#if frequency}
      {frequency}
    {:else}
      --
    {/if}
  </span>
	
	<button on:click={click} class:active={buttonActive} aria-label="{analyserNode ? 'start' : 'stop'} tuner">
	</button>
</main>

<style>
  main {
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 400px;
    height: 400px;
    background-color: black;
    border-radius: .2em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  button {
    height: 50px;
    width: 50px;
    margin-top: auto;
    border: 0;
    border-radius: 50%;
    background: silver;
    position: relative;
    transition: all .3s;
    outline: none;
  }
  button::before {
    content: '';
    position: absolute;
    width: 46px;
    height: 46px;
    border: 1px solid;
    border-radius: 50%;
    margin: 1px;
    top: 0;
    left: 0;
  }

  button:active, button.active {
    transform: scale(.95);
  }
</style>

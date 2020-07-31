<script type="typescript">
  import { initUserAudio, getDataArray, stopUserAudio } from "../services/audio";
  import SegmentDisplay from './SegmentDisplay.svelte';
  import * as Comlink from 'comlink';

//   interface IcalcluteNote {
//     calculate: Function(dataArray: Float32Array, sampleRate: number),
//     note: Promise<string>,
// }

  interface IcalcluteNote {
      calculate(dataArray: Float32Array, sampleRate: number): void;
      note: string;
  }
  interface ICalculateNoteConstructur {
    new (): IcalcluteNote,
  }

  let analyserNode: AnalyserNode = null;
  let sampleRate: number;
  let interval: number = null;
  let worker: Worker;
  let note: string;
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

<main>
  <h1>Svelte Tuner</h1>
  
  <SegmentDisplay {note}/>
	
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
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

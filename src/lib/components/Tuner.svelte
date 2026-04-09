<script lang="ts">
  import {
    initUserAudio,
    getDataArray,
    stopUserAudio,
  } from "../services/audio";
  import SegmentDisplay from "./SegmentDisplay.svelte";
  import CentDisplay from "./CentDisplay.svelte";
  import * as Comlink from "comlink";

  let analyserNode: AnalyserNode | null = $state(null);
  let sampleRate: number = $state(0);
  let interval: ReturnType<typeof setInterval> | null = $state(null);
  let worker: Worker | undefined = undefined;
  let note: string = $state("");
  let frequency: number = $state(0);
  let cent: number = $state(0);
  let calculateNote: Comlink.Remote<IcalcluteNote> | undefined = undefined;
  let running: boolean = $state(false);
  let buttonActive: boolean = $state(false);

  const analyse = async () => {
    if (running) return;
    if (!analyserNode) return;
    if (!calculateNote) return;
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
    setTimeout(() => {
      buttonActive = false;
    }, 300);
    if (analyserNode) return reset();
    const result = await initUserAudio();
    if (!result) return;
    analyserNode = result.analyserNode;
    sampleRate = result.sampleRate;
    await initWorker();
    interval = setInterval(analyse, 250);
  };

  const initWorker = async () => {
    if (worker) return;
    const w = (await import("../workers/calculateNote.ts?worker")).default;
    worker = new w();
    const CalculateNote: Comlink.Remote<ICalculateNoteConstructur> =
      Comlink.wrap(worker);
    calculateNote = await new CalculateNote();
  };
  const reset = () => {
    analyserNode = null;
    stopUserAudio();
    if (interval) clearInterval(interval);
  };
</script>

<main class="flex">
  <div class="brushedMetal"></div>

  <CentDisplay {cent} />

  <SegmentDisplay {note} isOn={!!analyserNode} />

  <button
    onclick={click}
    class:active={buttonActive}
    aria-label="{analyserNode ? 'stop' : 'start'} tuner"
  ></button>
</main>

<style>
  main {
    max-width: 90vw;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 0.2em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  main:before,
  main:after {
    content: "";
    height: 100%;
    width: 25px;
    position: absolute;
    background: #000;
    top: 0;
    border-radius: 5px;
  }
  main:before {
    left: -5px;
  }
  main:after {
    right: -5px;
  }
  .brushedMetal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-image: repeating-linear-gradient(
        hsla(0, 0%, 30%, 0) 0%,
        hsla(0, 0%, 30%, 0) 6%,
        hsla(0, 0%, 30%, 0.1) 7.5%
      ),
      repeating-linear-gradient(
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0) 4%,
        hsla(0, 0%, 0%, 0.03) 4.5%
      ),
      repeating-linear-gradient(
        hsla(0, 0%, 30%, 0) 0%,
        hsla(0, 0%, 30%, 0) 1.2%,
        hsla(0, 0%, 30%, 0.15) 2.2%
      ),
      linear-gradient(
        180deg,
        hsl(0, 0%, 4%) 0%,
        hsl(0, 0%, 15%) 47%,
        hsl(0, 0%, 4%) 53%,
        hsl(0, 0%, 0%) 100%
      );
  }

  button {
    height: 50px;
    width: 50px;
    margin-top: auto;
    border: 0;
    border-radius: 50%;
    background: silver;
    position: relative;
    transition: all 0.3s;
    outline: none;
  }
  button::before {
    content: "";
    position: absolute;
    width: 46px;
    height: 46px;
    border: 1px solid;
    border-radius: 50%;
    margin: 1px;
    top: 0;
    left: 0;
  }

  button:active,
  button.active {
    transform: scale(0.95);
  }
</style>

<script type="typescript">
  import { onMount, beforeUpdate } from "svelte";
  import { initUserAudio, getDataArray } from "../services/audio";

  let canvas: HTMLCanvasElement;
  let canvasCtx: CanvasRenderingContext2D;
  let analyserNode: AnalyserNode;
  let bufferLength: number;

  const draw = () => {
    const dataArray: Float32Array = getDataArray(analyserNode);
    //Draw black background
    canvasCtx.fillStyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw spectrum
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let posX = 0;
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] + 140) * 2;
      canvasCtx.fillStyle = "rgb(" + Math.floor(barHeight + 100) + ", 50, 50)";
      canvasCtx.fillRect(
        posX,
        canvas.height - barHeight / 2,
        barWidth,
        barHeight / 2
      );
      posX += barWidth + 1;
    }
  };

  onMount(() => {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  });

  const start = async () => {
    ({ analyserNode, bufferLength } = await initUserAudio());
  };

  beforeUpdate(() => {
    if (!analyserNode) return;
    draw();
  });
</script>

<style>
  .container {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50vh;
  }
</style>

<h1>Svelte Tuner</h1>

<button on:click={start}>start</button>

<div class="container">
  <canvas bind:this={canvas} />
</div>

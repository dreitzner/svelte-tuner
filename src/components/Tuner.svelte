<script type="typescript">
  import { onMount, beforeUpdate } from "svelte";
  import { initUserAudio, getDataArray, stopUserAudio } from "../services/audio";
  import SegmentDisplay from './SegmentDisplay.svelte';

  let canvas: HTMLCanvasElement;
  let canvasCtx: CanvasRenderingContext2D;
  let analyserNode: AnalyserNode = null;
  let bufferLength: number;

  const draw = () => {
		if (!analyserNode) return;
		requestAnimationFrame(draw);
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

  const click = async () => {
		if (analyserNode) return reset();
		({ analyserNode, bufferLength } = await initUserAudio());
		draw();
	};
	
	const reset = () => {
		analyserNode = null;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		stopUserAudio();
	}
</script>

<main>
  <h1>Svelte Tuner</h1>
  
  <SegmentDisplay />
	
	<button on:click={click}>
		{#if analyserNode}
			stop
		{:else}
			start
		{/if}
	</button>
	
	<div class="container">
		<canvas bind:this={canvas} />
	</div>
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
  .container {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
  }
</style>

<script type="ts">
    export let ledValue: number;
    export let cent: number;
    $: brightness = Math.min(Math.max((5 - Math.abs(cent - ledValue)) / 5, 0), 1) * .7 + .3;
</script>

<div
    class="led -big"
    class:isOn={brightness > .3}
    class:-green={ledValue === 0}
    style="opacity: {brightness}"></div>

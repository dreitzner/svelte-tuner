<script lang="ts">
    import {noteMapper} from '../services/noteMapper';
    import Segment from './Segment.svelte';
    export let note: string = null;
    export let isOn: boolean = false;
    $: mappedNote = noteMapper(isOn ? note : null);
</script>
<div class="border">
    {#if mappedNote}
    <div class="wrapper flex">
        <div class="sharp led" class:isOn={mappedNote.sharp}>#&nbsp;Note</div>
        <div class="flex">
            <Segment isOn={mappedNote.t0} isFirst={true}/>
            <Segment isOn={mappedNote.t1} />
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.tm0} upright={true} isFirst={true}/>
            <Segment isOn={mappedNote.tm1} turnedLeft={true}/>
            <Segment isOn={mappedNote.tm2} upright={true}/>
            <Segment isOn={mappedNote.tm3} turnedRight={true}/>
            <Segment isOn={mappedNote.tm4} upright={true}/>
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.m0} isFirst={true} />
            <Segment isOn={mappedNote.m1} />
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.mb0} upright={true} isFirst={true}/>
            <Segment isOn={mappedNote.mb1} turnedRight={true}/>
            <Segment isOn={mappedNote.mb2} upright={true}/>
            <Segment isOn={mappedNote.mb3} turnedLeft={true}/>
            <Segment isOn={mappedNote.mb4} upright={true}/>
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.b0} isFirst={true}/>
            <Segment isOn={mappedNote.b1} />
        </div>
    </div>
    {/if}
</div>


<style>
    .border {
        border: 5px inset #b7b7b71f;
    }
    .wrapper {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        width: 68px;
        background: #000;
    }
    .sharp {
        width: 100%;
        margin-bottom: 10px;
        color: #888;
    }
    .sharp:before {
        top: 23px;
    }
</style>

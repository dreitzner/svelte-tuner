<script type="typescript">
    import {notes} from '../services/notes';
    import {noteMapper} from '../services/noteMapper';
    import Segment from './Segment.svelte';
    let note: string;
    $: mappedNote = noteMapper(note);
</script>
<div>
    <select name="note" bind:value={note}>
        {#each notes as note}
            <option value="{note}">{note}</option>
        {/each}
    </select>

    {#if mappedNote}
    <div class="wrapper">
        <div class="flex">
            <Segment isOn={mappedNote.t0} />
            <Segment isOn={mappedNote.t1} />
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.tm0} upright={true}/>
            <Segment isOn={mappedNote.tm1} turnedLeft={true}/>
            <Segment isOn={mappedNote.tm2} upright={true}/>
            <Segment isOn={mappedNote.tm3} turnedRight={true}/>
            <Segment isOn={mappedNote.tm4} upright={true}/>
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.m0} />
            <Segment isOn={mappedNote.m1} />
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.mb0} upright={true}/>
            <Segment isOn={mappedNote.mb1} turnedRight={true}/>
            <Segment isOn={mappedNote.mb2} upright={true}/>
            <Segment isOn={mappedNote.mb3} turnedLeft={true}/>
            <Segment isOn={mappedNote.mb4} upright={true}/>
        </div>
        <div class="flex">
            <Segment isOn={mappedNote.b0} />
            <Segment isOn={mappedNote.b1} />
        </div>
    </div>
    {/if}
</div>


<style>
    .wrapper {
        background: black;
        padding: 1rem;
        width: 68px;
    }
</style>

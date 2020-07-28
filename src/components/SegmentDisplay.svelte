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
    <div>
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

        </div>
        <div class="flex">

        </div>
        <div class="flex">

        </div>
    </div>
    {/if}
</div>


<style>
</style>

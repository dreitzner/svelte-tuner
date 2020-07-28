<script type="typescript">
    import {notes} from '../services/notes';
    import {noteMapper} from '../services/noteMapper'
    let note: string;
    $: mappedNote = noteMapper(note);
</script>
<div>
    <select name="note" bind:value={note}>
        {#each notes as note}
            <option value="{note}">{note}</option>
        {/each}
    </select>

    


</div>


<style>
</style>

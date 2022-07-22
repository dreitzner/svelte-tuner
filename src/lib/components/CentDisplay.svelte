<script type="ts">
    import Cent from '$lib/components/Cent.svelte';

    export let cent
</script>

<div class="flex">
    <Cent ledValue={-50} {cent} />
    <Cent ledValue={-40} {cent} />
    <Cent ledValue={-30} {cent} />
    <Cent ledValue={-20} {cent} />
    <Cent ledValue={-10} {cent} />
    <Cent ledValue={0} {cent} />
    <Cent ledValue={10} {cent} />
    <Cent ledValue={20} {cent} />
    <Cent ledValue={30} {cent} />
    <Cent ledValue={40} {cent} />
    <Cent ledValue={50} {cent} />
</div>

<style>
    div{
        margin-top: 30px;
        height: 25px;
        width: 80%;
        justify-content: space-around;
    }
</style>
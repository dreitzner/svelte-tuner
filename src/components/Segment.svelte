<script type="typescript">
    export let isOn: boolean;
    export let upright: boolean = false;
    export let turnedLeft: boolean = false;
    export let turnedRight: boolean = false;
</script>
<!--
    wrap relative>absolute for tilted
-->
<div
    class:isOn
    class:upright
    class:turnedLeft
    class:turnedRight>
    <div></div></div>


<style>
    div div{
        height: 5px;
        width: 20px;
        background: red;
        opacity: .3;
        transition: all .3s;
        margin: .2rem;
    }
    .isOn div{
        opacity: 1;
        box-shadow: 0 0 3px 2px rgb(255 0 0 / 80%);
    }
    .upright div{
        height: 20px;
        width: 5px;
    }
    .turnedLeft, .turnedRight {
        position: relative;
    }
    .turnedLeft div, .turnedRight div {
        transform-origin: top left;
        position: absolute;
    }
    .turnedLeft div{
        transform: rotate(75deg);
        min-width: 8px;
        margin-left: 2px;
    }
    .turnedRight div{
        transform: rotate(105deg);   
        min-width: 4px;
        margin-left: 8px;
    }
</style>

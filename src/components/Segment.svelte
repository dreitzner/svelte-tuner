<script type="typescript">
    export let isOn: boolean;
    export let isFirst: boolean = false;
    export let upright: boolean = false;
    export let turnedLeft: boolean = false;
    export let turnedRight: boolean = false;
</script>
<!--
    wrap relative>absolute for tilted
-->
<div
    class:isOn
    class:isFirst
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
        transition: all .5s;
        margin: .15rem .05rem;
        margin-left: calc(5px + .1rem);
    }

    .isOn div{
        opacity: 1;
        box-shadow: 0 0 3px 2px rgb(255 0 0 / 80%);
    }
    .isFirst div {
        margin-left: 0;
    }
    .upright div{
        height: 20px;
        width: 5px;
        margin-left: .05rem;
    }
    .turnedLeft, .turnedRight {
        position: relative;
        width: 20px;
        margin: .05rem;
    }
    .turnedLeft div, .turnedRight div {
        transform-origin: top left;
        position: absolute;
    }
    .turnedLeft div{
        transform: rotate(58deg);
    }
    .turnedRight div{
        transform: rotate(122deg);
        left: 10px;
        top: 2px;
    }
</style>

<script>
  import Logo from '../icons/Wappen.svelte';
</script>

<header class="flex">
  <a href="https://reitzner.at">
    <Logo />
  </a>
  
  <h1>Svelte Tuner</h1>
</header>

<style>
  header {
    border-top: 10px solid #0c3d87;
    background: linear-gradient(rgba(255, 62, 0, 0.1), #fff 80%);
    font-weight: 300;
    padding: 0 1em;
  }

  a :global(.wappen) {
    height: calc(40px - 0.2em);
    padding: 0.1em;
    margin-right: .9em;
  }
</style>

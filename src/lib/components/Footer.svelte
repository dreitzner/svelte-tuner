<script>
  import Mail from '../icons/Mail.svelte';
  import Github from '../icons/Github.svelte';
  import Twitter from '../icons/Twitter.svelte';
</script>

<footer class="flex">
    <a class="flex" href="mailto:domenik@reitzner.at?subject=reitner.at-Mail" title="E-Mail me">
        <Mail />
    </a>
    <a class="flex" href="https://github.com/dreitzner" title="github">
        <Github />
    </a>
    <a class="flex" href="https://twitter.com/reitznerdomenik" title="twitter">
        <Twitter />
    </a>
</footer>

<style>
    footer {
        position: fixed;
        bottom: 0;
        right: 0;
    }
    a {
        padding: .25em;
    }
    footer :global(svg) {
        width: 32px;
    }
    footer :global(.mail) {
        height: 32px;
    }
    footer :global(.github) {
        height: 24px;
    }
    footer :global(.twitter) {
        height: 28px;
    }
    .flex {
        align-items: center;
    }

    @media (max-width: 479px) {
        footer :global(svg) {
            transform: scale(1.2);
        }
    }
</style>

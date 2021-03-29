<script>
    import SvgGithub from "../assets/icons/SvgGithub.svelte";
</script>

<a href="https://github.com/KrystofM/3d-hypergraph-evolution" class="github" target="_blank">
    <SvgGithub/>
</a>

<style lang="sass">
    @import "../styles/mixins/breakpoints.sass"
    @import "../styles/mixins/position.sass"
    @import "../styles/variables.sass"

    .github
        +absolute(null null 20px 20px)
        display: none
        fill: $c-main

        +breakpoint(m)
            display: block

</style>
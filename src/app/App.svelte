<script lang="ts">
    import GraphRendering from "./parts/GraphRendering"
    import GraphControls from "./parts/GraphControls"
    import Logo from "./components/Logo.svelte";
    import {hiddenUI} from "../stores";
    import GithubLink from "./components/GithubLink.svelte";
</script>

<main class="{$hiddenUI ? 'hidden': ''}">
    <GraphRendering/>
    <GraphControls/>
    <Logo/>
    <GithubLink/>
</main>

<style lang="sass">
    @import "src/app/styles/variables"
    @import "src/app/styles/mixins/position"

    main
      +relative

</style>
<script lang="ts">
    import GraphRendering from "./parts/GraphRendering"
    import GraphControls from "./parts/GraphControls"
    import Logo from "./components/Logo.svelte";
    import {hiddenUI} from "../stores";
</script>

<main class="{$hiddenUI ? 'hidden': ''}">
    <GraphRendering/>
    <GraphControls/>
    <Logo/>
</main>

<style lang="sass">
    @import "src/app/styles/variables"
    @import "src/app/styles/mixins/position"

    main
      +relative

</style>
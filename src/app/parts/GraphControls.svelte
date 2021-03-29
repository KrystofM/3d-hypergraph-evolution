<script lang="ts">
    import {ALL_RULES} from "../../hypergraphs/rules";
    import {activeRender, activeRule, ruleProgress, isPlaying, autoZoom, isBloom, hiddenUI} from "../stores";
    import SvgPause from "../assets/icons/SvgPause.svelte";
    import SvgPlay from "../assets/icons/SvgPlay.svelte";
    import CheckBox from "../components/CheckBox.svelte";

    function handleKeyboard(e: KeyboardEvent) {
        switch (e.key) {
            case "c":
                hiddenUI.update(v => !v);
                break;
            case " ":

                break;
        }
    }

    function handlePlay() {
        //
    }

    function handleStop() {
        $activeRender.pause();
    }

    activeRender.subscribe(render => {
        console.log('event');
    })


    document.addEventListener('keydown', handleKeyboard)
</script>

<section class="controls">
    <div class="controls-in">
        <div class="controls-options">
            <CheckBox text="Auto zoom" on:change={(event) => autoZoom.set(event.detail.value)} bind:checked={$autoZoom}/>
            <CheckBox text="Bloom" on:change={(event) => isBloom.set(event.detail.value)} bind:checked={$isBloom}/>
        </div>
        <div class="controls-rules">
            {#each ALL_RULES as rule}
                <div class="controls-rule">
                    <div class="controls-rule-wrap">
                        <div class="controls-rule-icons">
                            {#if rule === $activeRule && $isPlaying}
                                <span class="controls-rule-icons-pause" on:click={handleStop}>
                                    <SvgPause/>
                                </span>
                            {/if}
                            {#if !(rule === $activeRule && $isPlaying)}
                                <span class="controls-rule-icons-play" on:click={handlePlay}>
                                    <SvgPlay/>
                                </span>
                            {/if}
                        </div>
                        <p class="controls-rule-text">{rule.name}</p>
                    </div>
                    <div class="controls-rule-progress">
                        {#if rule === $activeRender.hyperGraphRule}
                            <span class="controls-rule-progress-line" style="width: {$ruleProgress}%"></span>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <p class="controls-clue">Press C to toggle hiding controls</p>
    </div>
</section>

<style lang="sass">
    @import "src/app/styles/variables"
    @import "src/app/styles/mixins/position"
    @import "src/app/styles/mixins/size"

    .controls
        +absolute(0 null null 0)
        +size(100%)
        display: flex
        justify-content: flex-end
        align-items: center
        pointer-events: none

        &-in
          max-width: 275px
          width: 100%
          margin-right: 60px
          pointer-events: all

        &-options
          display: flex

        &-rules
          //

        &-rule
          position: relative
          width: 100%
          color: $c-main

          &-wrap
            display: flex
            align-items: center

          &-icons
            cursor: pointer
            &-pause,
            &-play
              display: block
              padding: 13px 3px 0

          &-text
            margin: 0
            padding: 15px 0 5px

          &-progress
            +absolute(null null 0 0)
            +size(100% 2px)
            border-radius: 3px
            border: 1px $c-main solid

            &-line
              height: 100%
              display: block
              background-color: $c-main

        &-clue
          margin-top: 25px
          font-size: 11px
          text-align: center


</style>


<script lang="ts">
    import {ALL_RULES} from "../../hypergraphs/rules";
    import {activeRule, ruleProgress, isPlaying} from "../../stores";
    import SvgPause from "../assets/icons/SvgPause.svelte";
    import SvgPlay from "../assets/icons/SvgPlay.svelte";
</script>

<section class="controls">
    <div class="controls-in">
        <div class="controls-options">

        </div>
        <div class="controls-rules">
            {#each ALL_RULES as rule}
                <div class="controls-rule">
                    <div class="controls-rule-wrap">
                        <div class="controls-rule-icons">
                            {#if rule === $activeRule && $isPlaying}
                                <span class="controls-rule-icons-pause" on:click={() => isPlaying.set(false)}>
                                    <SvgPause/>
                                </span>
                            {/if}
                            {#if !(rule === $activeRule && $isPlaying)}
                                <span class="controls-rule-icons-play" on:click={() => activeRule.set(rule)}>
                                    <SvgPlay/>
                                </span>
                            {/if}
                        </div>
                        <p class="controls-rule-text">{rule.name}</p>
                    </div>
                    <div class="controls-rule-progress">
                        {#if rule === $activeRule}
                            <span class="controls-rule-progress-line" style="width: {$ruleProgress}%"></span>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>

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


</style>


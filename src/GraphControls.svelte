<script lang="ts">
    import {ALL_RULES} from "./hypergraphs/rules";
    import {activeRule, ruleProgress, isPlaying} from "./stores";
    import SvgPause from "./icons/SvgPause.svelte";
    import SvgPlay from "./icons/SvgPlay.svelte";
</script>

<section class="controls">
    <div class="controls-in">
        {#each ALL_RULES as rule}
            <div class="controls-item">
                <div class="controls-item-wrap">
                    <div class="controls-item-icons">
                        {#if rule === $activeRule && $isPlaying}
                            <span class="controls-item-icons-pause" on:click={() => isPlaying.set(false)}>
                                <SvgPause/>
                            </span>
                        {/if}
                        {#if !(rule === $activeRule && $isPlaying)}
                            <span class="controls-item-icons-play" on:click={() => activeRule.set(rule)}>
                                <SvgPlay/>
                            </span>
                        {/if}
                    </div>
                    <p>{rule.name}</p>
                </div>
                <div class="controls-item-time">
                    {#if rule === $activeRule}
                        <span style="width: {$ruleProgress}%"></span>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</section>

<style lang="sass">
    @import "styles/variables"

    .controls
        position: absolute
        top: 0
        left: 0
        height: 100%
        width: 100%
        display: flex
        justify-content: flex-end
        align-items: center
        pointer-events: none

        &-in
          max-width: 275px
          width: 100%
          margin-right: 60px
          pointer-events: all

        &-item
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

          p
            margin: 0
            padding: 15px 0 5px
            font-size: 18px
            font-family: 'Avenir', serif

          &-time
            position: absolute
            left: 0
            bottom: 0
            width: 100%
            height: 2px
            border-radius: 3px
            border: 1px $c-main solid

            span
              display: block
              width: 1px
              height: 100%
              background-color: $c-main


</style>


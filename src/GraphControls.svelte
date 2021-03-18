<script lang="ts">
    import {ALL_RULES} from "./hypergraphs/rules";
    import HyperGraphRule from "./hypergraphs/hyperGraphRule";
    import {activeRule, ruleProgress} from "./stores";

    let rules: Array<HyperGraphRule> = ALL_RULES;

</script>

<section class="controls">
    <div class="controls-in">
        {#each rules as rule}
            <div class="controls-item" on:click={() => activeRule.set(rule)}>
                <p>{rule.name}</p>
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
          cursor: pointer

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


<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let text: string;
    export let checked: boolean = false;

    const dispatch = createEventDispatcher();

    $: dispatch('change', {
        value: checked
    })
</script>

<label class="checkbox">
    <input type="checkbox" class="checkbox-input" bind:checked={checked}/>
    <span class="checkbox-box"></span>
    <p class="checkbox-text">{text}</p>
</label>

<style lang="sass">
  @import "src/app/styles/variables"
  @import "src/app/styles/mixins/position"
  @import "src/app/styles/mixins/size"

  .checkbox
    display: flex
    align-items: center
    cursor: pointer
    padding: 3px 0

    &-input
      +absolute()
      +size(0)

    &-input:checked + &-box::before
      display: block

    &-box
      +relative
      +size(10px)
      border: 1px solid $c-main
      display: inline-block

      &::before
        +absolute(50%)
        +size(7px)
        transform: translate(-50%, -50%)
        border-radius: 50%
        background-color: $c-main
        content: ''
        display: none

    &-text
      text-transform: uppercase
      font-size: 11px
      font-weight: $fw-heavy
      margin: 0
      padding: 1px 15px 0 5px
      user-select: none

</style>
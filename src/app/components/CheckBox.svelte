

<label class="checkbox">
    <input type="checkbox" class="checkbox-input" />
    <span class="checkbox-box"></span>
    <p class="checkbox-text">Auto Zoom</p>
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
      color: $c-main
      margin: 0
      padding: 1px 15px 0 5px
      user-select: none

</style>
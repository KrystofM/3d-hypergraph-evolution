<div class="logo">
    <h1 class="logo-headline">3d HyperGraph</h1>
    <h2 class="logo-subline">Evolution</h2>
</div>

<style lang="sass">
  @import "src/app/styles/variables"
  @import "src/app/styles/mixins/breakpoints"

  .logo
    position: absolute
    left: 15px
    top: 15px
    pointer-events: none

    &-headline,
    &-subline
      text-transform: uppercase
      color: $c-main
      margin: 0

    &-headline
      font-size: 22px

    &-subline
      -webkit-text-stroke: 2px $c-main
      -webkit-text-fill-color: transparent
      margin-top: -5px
      font-size: 14px

    +breakpoint(sm)
      &-headline
        font-size: 25px

      &-subline
        font-size: 16px

    +breakpoint(s)
        &-headline
          font-size: 34px

        &-subline
          font-size: 24px


</style>
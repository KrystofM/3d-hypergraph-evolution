<div class="logo">
    <h1 class="logo-headline">3d HyperGraph</h1>
    <h2 class="logo-subline">Evolution</h2>
</div>

<style lang="sass">
  @import "src/app/styles/variables"

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
      font-size: 34px

    &-subline
      -webkit-text-stroke: 2px $c-main
      -webkit-text-fill-color: transparent
      margin-top: -5px

</style>
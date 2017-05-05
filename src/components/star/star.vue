<!--星星组件-->
<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" track-by="$index" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLASS_ON)
        }
        if (hasDecimal) {
          result.push(CLASS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLASS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus">
  @import "./star"
</style>

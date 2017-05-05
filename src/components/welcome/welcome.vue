<!--欢迎界面组件-->
<template>
  <div class="welcome"  v-show="showWelcome">
    <div class="bg">
      <div class="logo" transition="wel" v-show="showWelcome">
        <img src="./logo.png">
      </div>
      <h1 class="title">Welcome to Vue WebApp</h1>
      <h2 class="url">www.52xc.top</h2>
      <div class="enter" @click="hidden">Enter Vue WebApp</div>
    </div>
  </div>
</template>

<script>
  import {quanping} from 'common/js/common'

  export default {
    data () {
      return {
        showWelcome: false
      }
    },
    methods: {
      hidden () {
        quanping()
        this.showWelcome = false
      }
    },
    ready () {
      this.$nextTick(() => {
        this.showWelcome = true
      })
    }
  }
</script>

<style lang="stylus">
  @import "./welcome.styl"
</style>

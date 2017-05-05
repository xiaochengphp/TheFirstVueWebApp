<template>
    <div class="footer">
        <div class="open" @click="open">进入全屏</div>
        <div class="exit" @click="exit">退出全屏</div>
    </div>
</template>

<script>
    export default {
      methods: {
        open () {
          this.launchFullscreen(document.documentElement)
        },
        exit () {
          this.exitFullscreen()
        },
        launchFullscreen (element) {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen()
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
          }
        },
        exitFullscreen () {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          }
        }
      }
    }
</script>

<style lang="stylus">
    .footer
        width: 100%
        height: 50px
        background: #141d27
        position: fixed
        bottom: 0
        .open
            width: 50%
            height: 100%
            display: inline-block
            background: rgba(255,0,0,0.4)
            color: rgb(255,255,255)
            font-size: 20px
            line-height: 50px
            text-align: center
            cursor: pointer
            float: left
        .exit
            width: 50%
            height: 100%
            display: inline-block
            background: rgba(0,255,0,0.2)
            color: rgb(255,255,255)
            font-size: 20px
            line-height: 50px
            text-align: center
            cursor: pointer
            float: right
        
</style>

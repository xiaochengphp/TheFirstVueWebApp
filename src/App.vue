<template>
  <div>
    <!--登录界面-->
    <v-welcome></v-welcome>

    <v-header :seller="seller"></v-header>

    <v-tab></v-tab>

    <router-view :seller="seller"></router-view>

    <!--<v-footer></v-footer>-->
  </div>
</template>

<script>
import Welcome from 'components/welcome/welcome'
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
// import Footer from './components/footer/footer'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('../static/data.json').then((response) => {
      response = response.body
      this.seller = response.seller
    })
  },
  components: {
    'v-welcome': Welcome,
    'v-header': Header,
    'v-tab': Tab
    // 'v-footer': Footer
  }
}
</script>

<style lang="stylus">

</style>

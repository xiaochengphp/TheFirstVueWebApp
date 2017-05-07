<template>
  <div>
    <!--登录界面-->
    <v-welcome></v-welcome>

    <v-header :seller="seller"></v-header>

    <v-tab></v-tab>

    <router-view :seller="seller" keep-alive></router-view>

    <!--<v-footer></v-footer>-->
  </div>
</template>

<script>
import Welcome from 'components/welcome/welcome'
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
// import Footer from './components/footer/footer'
import {urlParse} from 'common/js/util'
import Data from 'common/json/data.json'

export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created () {
//      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
//        response = response.body;
//        if (response.errno === ERR_OK) {
//          this.seller = response.data;
//          this.seller = Object.assign({}, this.seller, response.data);
//        }
//      });
    this.seller = Data.seller
    // console.log(window.location.href)
    // window.location.href += '?id=1'
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

<template>
    <div class="ratingss" v-el:ratingss>
      <div class="rating-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{ seller.score }}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <div class="star">
                <v-star :size="36" :score="seller.serviceScore"></v-star>
              </div>
              <span class="score">{{ seller.serviceScore }}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <div class="star">
                <v-star :size="36" :score="seller.foodScore"></v-star>
              </div>
              <span class="score">{{ seller.foodScore }}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{ seller.deliveryTime }}分钟</span>
            </div>
          </div>
        </div>
        <v-split></v-split>
        <v-ratingselect :select-type="selectType" :only-content="onlyContent" :desc="descs" :ratings="ratings"></v-ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
              <div class="avatar">
                <img :src="rating.avatar" width="28" height="28" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{ rating.username }}</h1>
                <div class="star-wrapper">
                  <v-star class="star" :size="24" :score="rating.score"></v-star>
                  <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                </div>
                <p class="text">{{ rating.text }}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span v-for="item in rating.recommend" class="item">{{ item }}</span>
                </div>
                <div class="time">{{ rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Star from 'components/star/star'
  import Split from 'components/split/split'
  import Ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/common'
  import Data from 'common/json/data.json'
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        descs: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    created () {
      // 本地调试代码
      // this.$http.get('./static/data.json').then((response) => {
      //   response = response.body
      //   this.ratings = response.ratings
      //   this.$nextTick(() => {
      //     if (!this.scroll) {
      //       this.scroll = new BScroll(this.$els.ratingss, {
      //         click: true
      //       })
      //     }
      //   })
      // })
      this.ratings = Data.ratings
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.ratingss, {
            click: true
          })
        }
      })
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    // 自定义过滤器
    filters: {
      // 格式化时间戳
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      'v-star': Star,
      'v-split': Split,
      'v-ratingselect': Ratingselect
    },
    events: {
      'ratingType.select' (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      'content.toggle' (onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "./ratings.styl"
</style>

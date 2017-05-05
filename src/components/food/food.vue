<!--商品页组件-->
<template>
    <div v-show="showFlag" class="food" transition="move" v-el:food>
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back">
              <i class="icon-arrow_lift" @click.stop="back"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{ food.name }}</h1>
            <div class="detail">
              <span class="sell-count">月售{{ food.sellCount }}</span>
              <span class="rating">好评率{{ food.rating }}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{ food.price }}</span>
              <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <v-cartcontrol :food="food"></v-cartcontrol>
            </div>
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addFirst($event)" transition="face">加入购物车</div>
          </div>
          <v-split v-show="food.info"></v-split>
          <div class="info" v-show="food.info">
            <div class="title">商品信息</div>
            <p class="text">{{ food.info }}</p>
          </div>
          <v-split></v-split>
          <div class="ratings" v-show="food.ratings">
            <div class="title">商品评价</div>
            <v-ratingselect :select-type="selectType" :only-content="onlyContent" :desc="descs" :ratings="food.ratings"></v-ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
                  <div class="user">
                    <span class="name">{{ rating.username }}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                  </div>
                  <div class="time">{{ rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>  
                    {{ rating.text }}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价...</div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import Split from 'components/split/split'
  import Ratingselect from 'components/ratingselect/ratingselect'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import {formatDate} from 'common/js/common'

  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        descs: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      back () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return true
        }
        this.$dispatch('cart.add', event.target)
        Vue.set(this.food, 'count', 1)
      },
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
      'v-cartcontrol': Cartcontrol,
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
  @import "./food.styl"
</style>

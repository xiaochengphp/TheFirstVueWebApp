<template>
    <div class="seller" v-el:seller>
        <div class="seller-content">
          <div class="overview">
            <h1 class="title">{{ seller.name }}</h1>
            <div class="desc">
              <v-star class="star" :size="36" :score="seller.score"></v-star>
              <span class="text">({{ seller.ratingCount }})</span>
              <span class="text">月售{{ seller.sellCount }}单</span>
            </div>
            <ul class="remark">
              <li class="block">
                <h2>起送价</h2>
                <div class="content">
                  <span class="stress">{{ seller.minPrice }}元</span>
                </div>
              </li>
              <li class="block">
                <h2>商家配送</h2>
                <div class="content">
                  <span class="stress">{{ seller.deliveryPrice }}元</span>
                </div>
              </li>
              <li class="block">
                <h2>平均配送时间</h2>
                <div class="content">
                  <span class="stress">{{ seller.deliveryTime }}分钟</span>
                </div>
              </li>
            </lu>
            <div class="favorite" @click="toggleFavorite($event)">
              <span class="icon-favorite" :class="{'active': favorite}"></span>
              <span class="text">{{ favoriteText }}</span>
            </div>
          </div>
          <v-split></v-split>
          <div class="bulletin">
            <h1 class="title">公告与活动</h1>
            <div class="content-wrapper">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
          </div>
          <v-split></v-split>
          <div class="pics">
            <h1 class="title">商家实景</h1>
            <div class="pic-wrapper" v-el:pic-wrapper>
              <ul class="pic-list" v-el:pic-list>
                <li class="pic-item" v-for="pic in seller.pics">
                  <img :src="pic" width="120" height="90" alt="">
                </li>
              </ul>
            </div>
          </div>
          <v-split></v-split>
          <div class="info">
            <h1 class="title">商家信息</h1>
            <ul>
              <li class="info-item" v-for="info in seller.infos">
                {{ info }}
              </li>
            </ul>
          </div>
        </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Star from 'components/star/star'
  import Split from 'components/split/split'
  import {saveToLocal, loadFromLocal} from 'common/js/store'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite')
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收　藏'
      }
    },
    components: {
      'v-star': Star,
      'v-split': Split
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    // 观察seller的变化
    watch: {
      'seller' () {
        this._initScroll()
        this._initPics()
      }
    },
    // Dom 渲染完后的Hook
    ready () {
      this._initScroll()
      this._initPics()
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.meunScroll = new BScroll(this.$els.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$els.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.scroll) {
              this.meunScroll = new BScroll(this.$els.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return true
        }
        this.favorite = !this.favorite
        // console.log(loadFromLocal(this.seller.id, 'favorite'))
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    }
  }
</script>

<style lang="stylus">
  @import "./seller.styl"
</style>

<!--评论组件-->
<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active': selectType === 2}">
        {{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span @click="select(0, $event)" class="block positive" :class="{'active': selectType === 0}">
        {{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span @click="select(1, $event)" class="block negative" :class="{'active': selectType === 1}">
        {{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div @click="toggleContent($event)" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <div v-for="item in ratings">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default () {
          return false
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        // 过滤每个是 POSITIVE 的数组
        return this.ratings.filter((ratings) => {
          return ratings.rateType === POSITIVE
        })
      },
      // 过滤每个是 POSITIVE 的数组
      negatives () {
        return this.ratings.filter((ratings) => {
          return ratings.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select (type, event) {
        // console.log(event._constructed)
        if (!event._constructed) {
          return true
        }
        this.selectType = type
        // 派发事件给父组件 组件通信
        this.$dispatch('ratingType.select', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return true
        }
        this.onlyContent = !this.onlyContent
        // 派发事件给父组件 组件通信
        this.$dispatch('content.toggle', this.onlyContent)
      }
    }
  }
</script>

<style lang="stylus">
  @import "./ratingselect.styl"
</style>

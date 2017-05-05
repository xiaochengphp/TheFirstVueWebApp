<!--购物车组件-->
<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight' : totalCount > 0}">
						<i class="icon-shopping_cart" :class="{'highlight' : totalCount > 0}"></i>
					</div>
          <div class="num" v-show="totalCount">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'highlight' : totalCount > 0}">￥{{ totalPrice }}</div>
				<div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
		</div>
    <!--加入购物车小球抛物线-->
    <div class="ball-container">
      <div v-for="ball in balls" v-show="ball.show" transition="drop" class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </div>
    <!--购物车详情-->
    <div class="shopcart-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul v-if="selectFoods">
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{ food.name }}</span>
            <div class="price">
              <span>￥{{ food.price * food.count }}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <v-cartcontrol :food="food"></v-cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
	</div>
  <div class="list-mask" v-show="listShow" transition="fade" @click="hiddenMask"></div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 9,
              count: 0
            },
            {
              price: 10,
              count: 0
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBall: [],
        fold: true  // 购物车详情状态
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送'
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return '还差￥' + diff + '元起送'
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          // 如果没有商品
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return true
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return true
        }
        this.fold = !this.fold
        this.p('Hello ')
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hiddenMask () {
        this.toggleList()
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return false
        }
        window.alert(`支付${this.totalPrice}元成功`)
        this.empty()
      }
    },
    transitions: {
      drop: {
        beforeEnter (el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect()  // 获取el元素在视图的位置
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 32)
              el.style.display = ''
              el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
              el.style.transform = `translate3d(0, ${y}px, 0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
              inner.style.transform = `translate3d(${x}px, 0, 0)`
            }
          }
        },
        enter (el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)'
            el.style.transform = 'translate3d(0, 0, 0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(0, 0, 0)'
            inner.style.transform = 'translate3d(0, 0, 0)'
          })
        },
        afterEnter (el) {
          let ball = this.dropBall.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      }
    },
    components: {
      'v-cartcontrol': Cartcontrol
    }
  }
</script>

<style lang="stylus">
	@import "./shopcart.styl"
</style>
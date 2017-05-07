<template>
    <div class="goods">
      <div class="menu-wrapper" v-el:menu-wrapper>
        <ul v-if="goods">
          <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="selectMenu($index, $event)">
            <span class="text">
              <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" v-el:food-wrapper>
        <ul v-if="goods">
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{ item.name }}</h1>
            <ul v-if="item.foods">
              <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <v-cartcontrol :food="food"></v-cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <v-shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
    </div>  
    <!--商品页-->
    <v-food :food="selectedFood" v-ref:food></v-food>
</template>

<script>
  import BScroll from 'better-scroll'
  import Shopcart from 'components/shopcart/shopcart'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import Food from 'components/food/food'
  import Data from 'common/json/data.json'
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      // this.$http.get('../../../static/data.json').then((response) => {
      //   response = response.body
      //   this.goods = response.goods
      this.goods = Data.goods
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
      // })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      selectMenu (index, event) {
        /* 使用better-scroll 在PC端的时候点击会产生两个事件 在移动端没有 判断是不是PC端 */
        if (!event._constructed) {
          return true
        }
        let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return true
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      _initScroll () {
        this.meunScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$els.foodWrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        // 获取每个DOM的高度
        for (let i = 0; i < foodList.length - 1; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _drop (target) {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
    },
    components: {
      'v-shopcart': Shopcart,
      'v-cartcontrol': Cartcontrol,
      'v-food': Food
    },
    events: {
      'cart.add' (target) {
        this._drop(target)
      }
    }
  }
</script>

<style lang="stylus">
  @import "./goods.styl"
</style>

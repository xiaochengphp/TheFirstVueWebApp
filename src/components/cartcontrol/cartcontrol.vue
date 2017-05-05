<!--加入购物车组件-->
<template>
	<div class="cartcontrol">{{ food.count }}
		<div class="cart-decrease" @click.stop="decreaseCart($event)" v-show="food.count > 0" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
		<div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
	</div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      // 添加商品到购物车
      addCart (event) {
        if (!event._constructed) {
          return true
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
          this.food.count = 1
        } else {
          this.food.count++
        }
        this.$dispatch('cart.add', event.target)
      },
      // 移除商品
      decreaseCart (event) {
        if (!event._constructed) {
          return true
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "./cartcontrol.styl"
</style>

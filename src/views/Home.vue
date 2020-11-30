<template>
  <div>
    <section id="store">
      <header>
        <p>Semua item</p>
      </header>
      <div class="items">
        <div class="item" v-for="(value, index) in items" :key="index">
          <div class="store">
            <img src="../assets/img/store.png" alt="" />
            <p>{{ value.store.name }}</p>
          </div>
          <div class="card">
            <div class="card-header">
              <p>Category: {{value.category.name}}</p><br>
              <p>{{ value.name }}</p>
              <img class="img" :src="value.stuff.image_url" alt="" />
            </div>
            <p class="price">
              {{
                value.price.toLocaleString('id', {
                  style: 'currency',
                  currency: 'IDR'
                })
              }}
            </p>
            <div class="card-footer-stock">
              <p>Stock: {{value.stuff.stock}}</p>
              <div class="delete" @click="addToCart(value)"><img src="../assets/img/cart.png" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="cart" v-show="cart.length > 0">
      <header>
        <p>Keranjang Belanja</p>
      </header>
      <div class="items">
        <div class="item" v-for="(value, index) in cart" :key="index">
          <div class="store">
            <img src="../assets/img/store.png" alt="" />
            <p>{{ value.store.name }}</p>
          </div>
          <div class="card">
            <div class="card-header">
              <p>{{ value.name }}</p>
              <img class="img" :src="value.stuff.image_url" alt="" />
            </div>
            <p class="price">
              {{
                value.price.toLocaleString('id', {
                  style: 'currency',
                  currency: 'IDR'
                })
              }}
            </p>
            <div class="card-footer">
              <div class="minus" @click="minus(value)">-</div>
              <div class="qty">{{ value.qty }}</div>
              <div class="add" @click="add(value)">+</div>
              <div class="delete" ><img @click="deleteItem(value)" src="../assets/img/trash.png" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout">
        <div>
          <p>TOTAL</p>
          <p>{{total.toLocaleString('id', {
                  style: 'currency',
                  currency: 'IDR'
                })}}</p>
        </div>
        <div @click="checkout" class="checkout-btn">
          <p>Bayar</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      items: [],
      cart: [],
      total: 0
    }
  },
  async created () {
    try {
      const res = await axios.get('http://localhost:3000/items')
      this.items = res.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    addToCart (payload) {
      const qty = 1
      const setData = { ...payload, qty }
      this.cart.push(setData)
      const totalPrice = this.cart.map(el => {
        return el.price * el.qty
      })
      this.total = totalPrice.reduce((el, i) => {
        return el + i
      })
    },
    deleteItem (payload) {
      this.cart = this.cart.filter(el => {
        return payload.id !== el.id
      })
    },
    add (payload) {
      payload.qty++
      if (payload.stuff.stock < payload.qty) {
        payload.qty = payload.stuff.stock
      }
      const totalPrice = this.cart.map(el => {
        return el.price * el.qty
      })
      this.total = totalPrice.reduce((el, i) => {
        return el + i
      })
    },
    minus (payload) {
      payload.qty--
      if (payload.qty < 1) {
        payload.qty = 1
      }
      const totalPrice = this.cart.map(el => {
        return el.price * payload.qty
      })
      this.total = totalPrice.reduce((el, i) => {
        return el + i
      })
    },
    checkout () {
      alert(`Pembelian berhasil, total biaya: ${this.total.toLocaleString('id', {
        style: 'currency',
        currency: 'IDR'
      })}`)
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/home.css');
</style>

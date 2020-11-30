import axios from 'axios'
export default {
  state: {
    items: []
  },
  mutations: {
    allItems (state, payload) {
      state.items = payload
      console.log(payload)
    }
  },
  actions: {
    getItems (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:3000/items')
          .then(res => {
            resolve(res)
            console.log(res)
            context.commit('allItems', res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {}
}

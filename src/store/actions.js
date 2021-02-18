import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addToCart({state, commit}, payload) {
    // payload新添加的商品

    // 查找之前数组中是否有该商品
    //let oldProduct = null
    // for (let item in state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    // 查找之前数组中是否有该商品
    // let oldProduct = state.cartList.find(function (item) {
    //   return item.iid === payload.iid
    // })

    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      // oldProduct.count += 1
      commit(ADD_COUNTER, oldProduct)
    }else {
      commit(ADD_TO_CART, payload)
    }
  }
}

import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart({state, commit}, payload) {
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
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) { // 当前商品数量+1
        // oldProduct.count += 1
        commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }else {
        commit(ADD_TO_CART, payload)
        resolve('添加了一个新的商品')
      }
    })

  }
}

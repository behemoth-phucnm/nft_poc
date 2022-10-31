import { getField } from 'vuex-map-fields'

const UPDATE_DATA = 'UPDATE_DATA'
const UPDATE_FETCHED = 'UPDATE_FETCHED'
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE'

export default {
  state: () => ({
    data: null,
    dataFetched: null,
    address: null,
    totalPrice: null,
  }),

  getters: {
    getField,
  },

  actions: {
    updateData({ commit }, data) {
      commit(UPDATE_DATA, data)
    },
    updateFetched({ commit }, data) {
      commit(UPDATE_FETCHED, data)
    },
    updateAddress({ commit }, data) {
      commit(UPDATE_ADDRESS, data)
    },
    updateTotalPrice({ commit }, data) {
      commit(UPDATE_TOTAL_PRICE, data)
    },
  },

  mutations: {
    UPDATE_DATA(state, payload) {
      state.data = payload
    },
    UPDATE_FETCHED(state, payload) {
      state.dataFetched = payload
    },
    UPDATE_ADDRESS(state, payload) {
      state.address = payload
    },
    UPDATE_TOTAL_PRICE(state, payload) {
      state.totalPrice = payload
    },
  },
}

import { getField } from 'vuex-map-fields'

const UPDATE_DATA = 'UPDATE_DATA'
const UPDATE_DATA_FETCHED = 'UPDATE_DATA_FETCHED'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const UPDATE_CURR_ADDRESS = 'UPDATE_CURR_ADDRESS'

export default {
  state: () => ({
    data: null,
    dataFetched: null,
    message: null,
    currAddress: null,
  }),

  getters: {
    getField,
  },

  actions: {
    updateData({ commit }, data) {
      commit(UPDATE_DATA, data)
    },
    updateDataFetched({ commit }, data) {
      commit(UPDATE_DATA_FETCHED, data)
    },
    updateMessage({ commit }, data) {
      commit(UPDATE_MESSAGE, data)
    },
    updateCurrAddress({ commit }, data) {
      commit(UPDATE_CURR_ADDRESS, data)
    },
  },

  mutations: {
    UPDATE_DATA(state, payload) {
      state.data = payload
    },
    UPDATE_DATA_FETCHED(state, payload) {
      state.dataFetched = payload
    },
    UPDATE_MESSAGE(state, payload) {
      state.message = payload
    },
    UPDATE_CURR_ADDRESS(state, payload) {
      state.currAddress = payload
    },
  },
}

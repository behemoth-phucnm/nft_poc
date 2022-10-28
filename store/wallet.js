import { getField } from 'vuex-map-fields'

const SET_ADDRESS = 'SET_ADDRESS'
const SET_STATUS = 'SET_STATUS'

export default {
  state: () => ({
    connected: false,
    currAddress: '',
  }),

  getters: {
    getField,
  },

  actions: {
    updateAddress({ commit }, address) {
      commit(SET_ADDRESS, address)
    },
    toggleConnect({ commit }, status) {
      commit(SET_STATUS, status)
    },
  },

  mutations: {
    SET_ADDRESS(state, payload) {
      state.currAddress = payload
    },
    SET_STATUS(state, payload) {
      state.connected = payload
    },
  },
}

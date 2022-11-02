import { getField } from 'vuex-map-fields'

const SET_PRIVATE_KEY = 'SET_PRIVATE_KEY'
const SET_ADDRESS = 'SET_ADDRESS'
const SET_STATUS = 'SET_STATUS'

export default {
  state: () => ({
    connected: null,
    currAddress: null,
    privateKey: null,
  }),

  getters: {
    getField,
  },

  actions: {
    updatePrivateKey({ commit }, privateKey) {
      commit(SET_PRIVATE_KEY, privateKey)
    },
    updateAddress({ commit }, address) {
      commit(SET_ADDRESS, address)
    },
    toggleConnect({ commit }, status) {
      commit(SET_STATUS, status)
    },
  },

  mutations: {
    SET_PRIVATE_KEY(state, payload) {
      state.privateKey = payload
    },
    SET_ADDRESS(state, payload) {
      state.currAddress = payload
    },
    SET_STATUS(state, payload) {
      state.connected = payload
    },
  },
}

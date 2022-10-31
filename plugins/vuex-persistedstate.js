import createPersistedState from 'vuex-persistedstate'

export default ({ store, req }) => {
  createPersistedState({
    key: 'vuex-persistedstate',
    paths: ['detail', 'profile', 'wallet'],
  })(store)
}

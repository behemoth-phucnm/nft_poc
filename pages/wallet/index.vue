<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="col-6 mt-5">
        <b-button variant="primary" @click="routerPush('/wallet/connect')">
          Connect exist wallet
        </b-button>
        <b-button variant="primary" @click="routerPush('/wallet/create')">
          Create new wallet
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapFields } from 'vuex-map-fields'
const walletMapper = createNamespacedHelpers('wallet')

export default {
  name: 'WalletIndex',
  data() {
    return {}
  },
  head() {
    // Set Meta Tags for this Page
  },
  // ...
  computed: {
    ...mapFields('wallet', {
      connected: 'connected',
      currAddress: 'currAddress',
      privateKey: 'privateKey',
    }),
  },
  mounted() {},
  methods: {
    ...walletMapper.mapActions(['updatePrivateKey', 'updateAddress']),

    routerPush(path) {
      this.$router.push({ path })
    },
  },
}
</script>

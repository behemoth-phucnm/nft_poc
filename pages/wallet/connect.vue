<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="col-6 mt-5">
        <b-form-input v-model="address" placeholder="0x"></b-form-input>
        <b-button variant="primary" @click="connect"> Connect wallet </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapFields } from 'vuex-map-fields'
const walletMapper = createNamespacedHelpers('wallet')

export default {
  name: 'ConnectWallet',
  data() {
    return {
      address: null,
    }
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
  mounted() {
    this.address = this.currAddress
  },
  methods: {
    ...walletMapper.mapActions(['updatePrivateKey', 'updateAddress']),

    connect() {
      this.updateAddress(this.address)
      this.$router.push('/wallet/complete')
    },
  },
}
</script>

<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="col-6 mt-5">
        <label for="">Address</label>
        <b-form-input v-model="currAddress" placeholder="0x"></b-form-input>
        <span>Private Key: {{ privateKey }}</span>
        <b-button variant="primary" @click="generate">Generate</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapFields } from 'vuex-map-fields'
const walletMapper = createNamespacedHelpers('wallet')
const crypto = require('crypto')
const ethers = require('ethers')

export default {
  name: 'CreateWallet',
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

    createWallet() {
      if (this.currAddress === null) {
        const id = crypto.randomBytes(32).toString('hex')
        const privateKey = '0x' + id
        this.updatePrivateKey(privateKey)
        // eslint-disable-next-line no-console
        console.log('SAVE BUT DO NOT SHARE THIS:', privateKey)

        const wallet = new ethers.Wallet(privateKey)
        this.updateAddress(wallet.address)
        // eslint-disable-next-line no-console
        console.log('Address: ' + wallet.address)
      }
    },

    generate() {
      this.createWallet()
      this.$router.push('/profile')
    },
  },
}
</script>

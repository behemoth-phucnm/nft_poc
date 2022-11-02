<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand @click="routerPush('/')">Marketplace</b-navbar-brand>
      <b-navbar-brand @click="routerPush('/sell')">Sell NFT</b-navbar-brand>
      <b-navbar-brand @click="routerPush('/profile')">
        Profile
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand @click="connectWebsite">
          {{ buttonText }}
        </b-navbar-brand>
        <span v-if="connected">{{ currAddress }}</span>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapFields } from 'vuex-map-fields'
const walletMapper = createNamespacedHelpers('wallet')

export default {
  name: 'NavBar',
  // ...
  data() {
    return {}
  },
  head() {
    // Set Meta Tags for this Page
  },
  computed: {
    ...mapFields('wallet', {
      connected: 'connected',
      currAddress: 'currAddress',
    }),

    buttonText() {
      return this.connected ? 'Connected' : 'Connect'
    },
  },
  mounted() {
    if (this.connected === null)
      this.toggleConnect(window.ethereum.isConnected())
  },
  methods: {
    ...walletMapper.mapActions(['toggleConnect', 'updateAddress']),

    updateButton() {},

    async getAddress() {
      const ethers = require('ethers')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const addr = await signer.getAddress()
      this.updateAddress(addr)
    },

    async connectWebsite() {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId !== '0x5') {
        // alert('Incorrect network! Switch your metamask network to Rinkeby');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        })
      }
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          this.updateButton()
          this.getAddress()
          this.toggleConnect(window.ethereum.isConnected())
        })
    },

    routerPush(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style>
.red {
  color: red;
}
</style>

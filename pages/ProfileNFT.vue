<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <div class="">
        <div class="">
          <div class="mb-5">
            <h2 class="">Wallet Address</h2>
            {{ address }}
          </div>
        </div>
        <div class="">
          <div>
            <h2 class="">No. of NFTs</h2>
            {{ data.length }}
          </div>
          <div class="ml-20">
            <h2 class="">Total Value</h2>
            {{ totalPrice }} ETH
          </div>
        </div>
        <div class="">
          <h2 class="">Your NFTs</h2>
          <div v-if="data.length" class="">
            <div v-for="(item, index) in data" :key="index">
              <b-card
                :title="item.name"
                :img-src="item.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class=""
              >
                <b-card-text>{{ item.description }}</b-card-text>
              </b-card>
            </div>
          </div>
          <div v-else class="">No NFT data to display</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import BehemothNFT from '../abi/BehemothNFT.json'
const ethers = require('ethers')
const profileMapper = createNamespacedHelpers('profile')

export default {
  name: 'ProfileNFT',
  data() {
    return {}
  },
  head() {
    // Set Meta Tags for this Page
  },
  // ...
  computed: {
    ...mapFields('profile', {
      data: 'data',
      dataFetched: 'dataFetched',
      address: 'address',
      totalPrice: 'totalPrice',
    }),
  },
  mounted() {
    this.getNFTData('BENFT')
  },
  methods: {
    ...profileMapper.mapActions([
      'updateData',
      'updateFetched',
      'updateAddress',
      'updateTotalPrice',
    ]),

    async getNFTData(tokenId) {
      let sumPrice = 0
      // After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const addr = await signer.getAddress()

      // Pull the deployed contract instance
      const contract = new ethers.Contract(
        BehemothNFT.address,
        BehemothNFT.abi,
        signer
      )

      // create an NFT Token
      const transaction = await contract.getMyNFTs()

      /*
       * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
       * and creates an object of information that is to be displayed
       */

      const items = await Promise.all(
        transaction.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId)
          let meta = await this.$axios.get(tokenURI)
          meta = meta.data

          const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          const item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          }
          sumPrice += Number(price)
          return item
        })
      )

      this.updateData(items)
      this.updateFetched(true)
      this.updateAddress(addr)
      this.updateTotalPrice(sumPrice.toPrecision(3))
    },
  },
}
</script>

<style>
.red {
  color: red;
}
</style>

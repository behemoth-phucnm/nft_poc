<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <img :src="data.image" alt="" class="" />
      <div class="">
        <div>Name: {{ data.name }}</div>
        <div>Description: {{ data.description }}</div>
        <div>
          Price: <span class="">{{ data.price }} ETH</span>
        </div>
        <div>
          Owner: <span class="text-sm">{{ data.owner }}</span>
        </div>
        <div>
          Seller: <span class="text-sm">{{ data.seller }}</span>
        </div>
        <div>
          <button v-if="isOwner" class="" @click="buyNFT(tokenId)">
            Buy this NFT
          </button>
          <div v-else class="">You are the owner of this NFT</div>
          <div class="">{{ message }}</div>
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
const tokenId = 'BENFT'

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
      message: 'message',
      currAddress: 'currAddress',
    }),

    isOwner() {
      return (
        this.currAddress === this.data.owner ||
        this.currAddress === this.data.seller
      )
    },
  },
  mounted() {
    this.getNFTData(tokenId)
  },
  methods: {
    ...profileMapper.mapActions([
      'updateData',
      'updateDataFetched',
      'updateMessage',
      'updateCurrAddress',
    ]),

    async getNFTData(tokenId) {
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
      const tokenURI = await contract.tokenURI(tokenId)
      const listedToken = await contract.getListedTokenForId(tokenId)
      let meta = await this.$axios.get(tokenURI)
      meta = meta.data

      const item = {
        price: meta.price,
        tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      }
      this.updateData(item)
      this.updateDataFetched(true)
      this.updateCurrAddress(addr)
    },

    async buyNFT(tokenId) {
      try {
        const ethers = require('ethers')
        // After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        // Pull the deployed contract instance
        const contract = new ethers.Contract(
          BehemothNFT.address,
          BehemothNFT.abi,
          signer
        )
        const salePrice = ethers.utils.parseUnits(this.data.price, 'ether')
        this.updateMessage('Buying the NFT... Please Wait (Upto 5 mins)')
        // run the executeSale function
        const transaction = await contract.executeSale(tokenId, {
          value: salePrice,
        })
        await transaction.wait()

        alert('You successfully bought the NFT!')
        this.updateMessage('')
      } catch (e) {
        alert('Upload Error' + e)
      }
    },
  },
}
</script>

<style>
.red {
  color: red;
}
</style>

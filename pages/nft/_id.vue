<template>
  <div>
    <NavBar></NavBar>
    <div v-if="data" class="container">
      <b-card-group deck>
        <b-card :img-src="data.image" img-alt="Card image" img-top>
          <b-card-text>
            <div>Name: {{ data.name }}</div>
            <div>Description: {{ data.description }}</div>
            <div>
              Price: <span class="">{{ data.price }} ETH</span>
            </div>
            <div>
              Owner: <span class="">{{ data.owner }}</span>
            </div>
            <div>
              Seller: <span class="">{{ data.seller }}</span>
            </div>
            <div>
              <b-button v-if="!isOwner" variant="primary" class="" @click="buyNFT(data.tokenId)">
                Buy this NFT
              </b-button>
              <div v-else class="">You are the owner of this NFT</div>
              <div class="">{{ message }}</div>
            </div>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import BehemothNFT from '@/abi/BehemothNFT.json'
const ethers = require('ethers')
const detailMapper = createNamespacedHelpers('detail')

export default {
  name: 'DetailNFT',
  data() {
    return {
      tokenId: Number(this.$route.params.id),
    }
  },
  head() {
    // Set Meta Tags for this Page
  },
  // ...
  computed: {
    ...mapFields('detail', {
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
    this.getNFTData(this.tokenId)
  },
  methods: {
    ...detailMapper.mapActions([
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
      const listedToken = await contract.getListedForTokenId(tokenId)
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

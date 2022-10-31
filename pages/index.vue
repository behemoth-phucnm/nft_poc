<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="">Top NFTs</div>
      <div class="">
        <div v-for="(item, index) in items" :key="index">
          <b-card
            :title="item.name"
            :img-src="item.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>{{ item.description }}</b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BehemothNFT from '../abi/BehemothNFT.json'
const ethers = require('ethers')

export default {
  name: 'MarketPlace',
  data() {
    return {
      items: null,
    }
  },
  head() {
    // Set Meta Tags for this Page
  },
  // ...
  mounted() {
    this.getAllNFTs()
  },
  methods: {
    async getAllNFTs() {
      // After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      // Pull the deployed contract instance
      const contract = new ethers.Contract(
        BehemothNFT.address,
        BehemothNFT.abi,
        signer
      )
      // create an NFT Token
      const transaction = await contract.getAllNFTs()

      // Fetch all the details of every NFT from the contract and display
      this.items = await Promise.all(
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
          return item
        })
      )
    },
  },
}
</script>

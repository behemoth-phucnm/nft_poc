<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <div class="px-8 pt-4 pb-8 mb-4">
        <h3>Upload your NFT to the marketplace</h3>
        <b-form>
          <b-form-group
            id="input-group-1"
            label="NFT Name"
            label-for="input-1"
            description=""
          >
            <b-form-input
              id="input-1"
              v-model="name"
              type="text"
              placeholder="Axie#4563"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="NFT Description"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="description"
              placeholder="Axie Infinity Collection"
              rows="6"
              max-rows="12"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Price (in ETH)"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="price"
              type="number"
              min="0.01"
              step="0.01"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Upload Image"
            label-for="input-4"
          >
            <b-form-file
              v-model="image"
              :state="Boolean(image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-form-group>

          <b-button variant="primary" @click="listNFT">Submit</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import BehemothNFT from '../abi/BehemothNFT.json'
const ethers = require('ethers')

export default {
  data() {
    return {
      name: null,
      description: null,
      price: 0,
      image: null,
    }
  },
  head() {
    // Set Meta Tags for this Page
  },
  // ...
  methods: {
    // This function uploads the NFT image to IPFS
    async uploadFileToIPFS() {
      // check for file extension
      try {
        // upload the file to IPFS
        const response = await this.$pinata.uploadFileToIPFS(this.image)
        if (response.success === true) {
          // console.log('Uploaded image to Pinata: ', response.pinataURL)
          // setFileURL(response.pinataURL)
          return response.pinataURL
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error during file upload', e)
      }
    },

    // This function uploads the metadata to IPFS
    async uploadMetadataToIPFS() {
      // const { name, description, price } = formParams
      const fileURL = await this.uploadFileToIPFS()
      // Make sure that none of the fields are empty
      if (!this.name || !this.description || !this.price || !fileURL) return
      const nftJSON = {
        name: this.name,
        description: this.description,
        price: this.price,
        image: fileURL,
      }
      try {
        // upload the metadata JSON to IPFS
        const response = await this.$pinata.uploadJSONToIPFS(nftJSON)
        if (response.success === true) {
          // eslint-disable-next-line no-console
          console.log('Uploaded JSON to Pinata: ', response)
          return response.pinataURL
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error uploading JSON metadata:', e)
      }
    },

    async listNFT() {
      // Upload data to IPFS
      try {
        const metadataURL = await this.uploadMetadataToIPFS()
        // After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        // console.log(provider)
        // updateMessage("Please wait.. uploading (upto 5 mins)")
        // Pull the deployed contract instance
        const contract = new ethers.Contract(
          BehemothNFT.address,
          BehemothNFT.abi,
          signer
        )
        // massage the params to be sent to the create NFT request
        const price = ethers.utils.parseUnits(String(this.price), 'ether')
        let listingPrice = await contract.getListPrice()
        listingPrice = listingPrice.toString()
        // actually create the NFT
        const transaction = await contract.createToken(metadataURL, price, {
          value: listingPrice,
        })
        await transaction.wait()
        alert('Successfully listed your NFT!')
        // updateMessage('')
        // updateFormParams({ name: '', description: '', price: '' })
        // window.location.replace('/')
      } catch (e) {
        alert('Upload error' + e)
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

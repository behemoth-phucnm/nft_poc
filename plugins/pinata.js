export default function (
  { $axios, $config: { pinataAPIKey, pinataSecretAPIKey } },
  inject
) {
  inject('pinata', {
    uploadJSONToIPFS(JSONBody) {
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
      // making axios POST request to Pinata ⬇️
      return $axios
        .post(url, JSONBody, {
          headers: {
            pinata_api_key: pinataAPIKey,
            pinata_secret_api_key: pinataSecretAPIKey,
          },
        })
        .then(function (response) {
          return {
            success: true,
            pinataURL:
              'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
          }
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.log(error)
          return {
            success: false,
            message: error.message,
          }
        })
    },

    uploadFileToIPFS(file) {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
      // making axios POST request to Pinata ⬇️

      const data = new FormData()
      data.append('file', file)

      const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
          exampleKey: 'exampleValue',
        },
      })
      data.append('pinataMetadata', metadata)

      // pinataOptions are optional
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
          regions: [
            {
              id: 'FRA1',
              desiredReplicationCount: 1,
            },
            {
              id: 'NYC1',
              desiredReplicationCount: 2,
            },
          ],
        },
      })
      data.append('pinataOptions', pinataOptions)
      return $axios
        .post(url, data, {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataAPIKey,
            pinata_secret_api_key: pinataSecretAPIKey,
          },
        })
        .then(function (response) {
          // eslint-disable-next-line no-console
          console.log('image uploaded', response.data.IpfsHash)
          return {
            success: true,
            pinataURL:
              'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
          }
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.log(error)
          return {
            success: false,
            message: error.message,
          }
        })
    },
  })
}

<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="col-6 mt-5">
        <span>Connect completed</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
// import { mapFields } from 'vuex-map-fields'
// const walletMapper = createNamespacedHelpers('wallet')

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
  computed: {},
  mounted() {},
  methods: {},
}
</script>

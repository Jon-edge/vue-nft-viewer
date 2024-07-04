<template>
  <div style="color: #fff; padding: 20px; background-color: #121212">
    <h1
      style="
        text-align: center;
        margin: 20px 0;
        font-size: 2rem;
        text-shadow: 2px 2px 2px rgba(131, 131, 131, 0.932);
      "
    >
      Stargaze NFT Display
    </h1>
    <div
      style="
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
        align-items: center;
      "
    >
      <div style="font-size: 1.25rem; margin-right: 5px">Address:</div>
      <input
        type="text"
        placeholder="Enter wallet address"
        v-model="ownerAddress"
        style="
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 2px solid #ccc;
          width: 380px;
          color: #333;
          background-color: #fff;
        "
      />
      <div style="font-size: 1.25rem; margin-right: 5px">Num NFTs:</div>
      <input
        type="number"
        placeholder="50"
        v-model.number="numNfts"
        style="
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 2px solid #ccc;
          width: 50px;
          color: #333;
          background-color: #fff;
        "
      />
      <button
        @click="onFetchButtonClick"
        style="
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          background-color: #4a5568;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          margin-left: 10px;
        "
      >
        Fetch NFTs
      </button>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color: red; text-align: center">
      {{ error }}
    </div>
    <NFTList :ownerAddress="ownerAddress" :numNfts="numNfts" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NFTList from './components/NFTList.vue' // Adjust path as necessary
import { fetchNFTs } from './utils/fetchNFTs' // Adjust path as necessary

const ownerAddress = ref('stars1a605a9879cafvsql5l3r734kl6flak866gfppe')
const numNfts = ref(50)
const nfts = ref([])
const loading = ref(false)
const error = ref(null)
</script>

<style scoped>
/* Add any additional styles here */
</style>

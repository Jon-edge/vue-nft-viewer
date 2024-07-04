<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error" style="color: red; text-align: center">
    {{ error }}
  </div>
  <div v-else>
    <div v-for="(nft, index) in nfts" :key="nft.id">
      <NFTCard
        :nft="nft"
        :index="index"
        :on-move-card="moveCard"
        :on-toggle-hide="() => toggleHideCard(nft)"
      />
    </div>
    <h1 v-if="hiddenNfts.length > 0" class="hidden-nfts-title">Hidden NFTs</h1>
    <div v-for="(nft, index) in hiddenNfts" :key="nft.id">
      <NFTCard
        :nft="nft"
        :index="index"
        :on-toggle-hide="() => toggleHideCard(nft)"
        is-hidden
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDrag, useDrop } from 'vue-dnd'
import { fetchNFTs } from '../utils/fetchNFTs'
import NFTCard from './NFTCard.vue'

const props = defineProps({
  ownerAddress: String,
  numNfts: Number
})

const nfts = ref([])
const hiddenNfts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const fetchedNFTs = await fetchNFTs(props.ownerAddress, props.numNfts)

    console.log('Fetched NFTs:', JSON.stringify(fetchedNFTs, null, 2))
    nfts.value = fetchedNFTs
  } catch (err) {
    error.value = 'Failed to fetch NFTs'
  } finally {
    loading.value = false
  }
})

const moveCard = (dragIndex, hoverIndex) => {
  const draggedItem = nfts.value.splice(dragIndex, 1)[0]
  nfts.value.splice(hoverIndex, 0, draggedItem)
}

const toggleHideCard = (nft) => {
  if (hiddenNfts.value.includes(nft)) {
    hiddenNfts.value = hiddenNfts.value.filter((item) => item !== nft)
    nfts.value.push(nft)
  } else {
    hiddenNfts.value.push(nft)
    nfts.value = nfts.value.filter((item) => item !== nft)
  }
}
</script>

<style scoped>
.hidden-nfts-title {
  margin: 40px;
  padding: 10px;
  font-size: 24px;
  color: #dfdfdf;
  text-shadow: 1px 1px 1px rgba(138, 138, 138, 0.932);
  text-align: center;
  font-weight: bold;
}
</style>

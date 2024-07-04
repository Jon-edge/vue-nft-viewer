<template>
  <div
    :style="{
      ...containerStyle,
      opacity: isDragging ? 0.5 : isHidden ? 0.65 : 1
    }"
  >
    <!-- <IconReorder
      :class="{ 'dark:invert': true }"
      :style="{
        ...iconStyle,
        opacity: isHidden ? 0 : 1,
        cursor: isHidden ? 'default' : 'move'
      }"
    /> -->
    <img
      :src="nft.media.url"
      :alt="nft.name"
      style="width: 100px; height: 100px; margin: 10px"
    />
    <div style="flex-grow: 1; margin: 10px">
      <h2 :style="titleStyle">{{ nft.name }}</h2>
      <p :style="descriptionStyle">{{ nft.description }}</p>
      <p :style="metaStyle"><b>Collection:</b> {{ nft.collection.name }}</p>
      <p :style="metaStyle"><b>Token ID:</b> {{ nft.tokenId }}</p>
      <p :style="metaStyle">
        <b>Last Sale Price:</b>
        {{
          nft.lastSalePrice?.amountUsd == null
            ? 'N/A'
            : `$${nft.lastSalePrice.amountUsd}`
        }}
      </p>
    </div>
    <component
      :is="isHidden ? 'IconShow' : 'IconClose'"
      :class="{ 'dark:invert': true }"
      :style="iconStyle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { NFT } from '../utils/fetchNFTs'
import IconShow from './icons/IconShow.vue'
import IconClose from './icons/IconClose.vue'
// import IconReorder from './icons/IconReorder.vue'

interface DragItem {
  id: string
  index: number
}

export default defineComponent({
  name: 'NFTCard',
  props: {
    nft: {
      type: Object as () => NFT,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  },
  // emits: ['moveCard', 'toggleHide'],
  setup(props, { emit }) {
    const containerRef = ref()
    const dragRef = ref()
    const isDragging = ref(false)

    // useDrop<DragItem>({
    //   accept: 'card',
    //   hover(item, monitor) {
    //     const dragIndex = item.index
    //     const hoverIndex = props.index
    //     if (!containerRef.value || dragIndex === hoverIndex) {
    //       return
    //     }

    //     const hoverBoundingRect = containerRef.value.getBoundingClientRect()
    //     const hoverMiddleY =
    //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    //     const clientOffset = monitor.getClientOffset()

    //     if (clientOffset) {
    //       const hoverClientY = clientOffset.y - hoverBoundingRect.top
    //       if (
    //         (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) ||
    //         (dragIndex > hoverIndex && hoverClientY < hoverMiddleY)
    //       ) {
    //         emit('moveCard', dragIndex, hoverIndex)
    //         item.index = hoverIndex
    //       }
    //     }
    //   }
    // })

    // useDrag({
    //   type: 'card',
    //   item: () => ({ id: props.nft.id, index: props.index }),
    //   collect: (monitor: DragSourceMonitor) => {
    //     isDragging.value = monitor.isDragging()
    //   }
    // })

    const containerStyle = reactive({
      backgroundColor: '#252525',
      borderRadius: '20px',
      padding: '10px',
      margin: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    })

    const titleStyle = reactive({
      textShadow: '2px 2px 2px rgba(0, 40, 219, 0.932)',
      fontWeight: 'bold',
      marginBottom: '5px'
    })

    const descriptionStyle = reactive({
      fontStyle: 'italic',
      marginBottom: '10px'
    })

    const metaStyle = reactive({
      fontSize: '12px',
      opacity: 0.5
    })

    const iconStyle = reactive({
      width: '24px',
      height: '24px',
      margin: '10px'
    })

    const toggleHide = () => {
      emit('toggleHide')
    }

    return {
      containerRef,
      dragRef,
      isDragging,
      containerStyle,
      titleStyle,
      descriptionStyle,
      metaStyle,
      iconStyle,
      toggleHide
    }
  }
})
</script>

<style scoped>
.dark\:invert {
  filter: invert(1);
}
</style>

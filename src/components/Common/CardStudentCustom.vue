<template>
  <div class="item">
    <div class="testimony-wrap py-4">
      <div class="text">
        <RatingCustom :rating="rating" />
        <p class="mb-4">{{ content }}</p>
        <div class="d-flex align-items-center">
          <div class="user-img" :style="{ backgroundImage: `url(${avatar})` }"></div>
          <div class="pl-3">
            <p class="name">{{ name }}</p>
            <span class="position">{{ position }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RatingCustom from './RatingCustom.vue'

const props = defineProps({
  content: String,
  name: String,
  position: String,
  avatar: String,
  rating: {
    type: Number,
    default: 5 
  }
})
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <p class="star">
      <span
        v-for="n in 5"
        :key="n"
        :class="['fa', n <= rating ? 'fa-star' : 'fa-star-o']"
      ></span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: {
    type: Number,
    default: 5
  }
});
</script>

<style scoped>

</style>

<template>
  <div class="staff">
      <div class="img-wrap d-flex align-items-stretch">
        <div class="img align-self-stretch" :style="{ backgroundImage: `url(${image})` }"></div>
      </div>
      <div class="text pt-3">
        <h3><router-link :to="link">{{ name }}</router-link></h3>
        <span class="position mb-2">{{ position }}</span>
        <div class="faded">
          <p>{{ description }}</p>
          <ul class="ftco-social text-center">
            <li class=""><router-link :to="twitter"><span class="fa fa-twitter"></span></router-link></li>
            <li class=""><router-link :to="facebook"><span class="fa fa-facebook"></span></router-link></li>
            <li class=""><router-link :to="google"><span class="fa fa-google"></span></router-link></li>
            <li class=""><router-link :to="instagram"><span class="fa fa-instagram"></span></router-link></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup>
  const props = defineProps({
  name: String,
  position: String,
  image: String,
  description: String,
  link: String,
  twitter: String,
  facebook: String,
  google: String,
  instagram: String
})
</script>

<style lang="scss" scoped>

</style>
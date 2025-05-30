<template>
  <div class="col-lg-4 ">
    <div class="blog-entry">
      <RouterLink :to="link" class="block-20" :style="{ backgroundImage: `url(${image})` }"></RouterLink>
      <div class="text d-block">
        <div class="meta">
          <p>
            <RouterLink :to="link"><span class="fa fa-calendar mr-1"></span>{{ date }}</RouterLink>
            <RouterLink :to="link"><span class="fa fa-user mr-1 ml-2"></span>{{ author }}</RouterLink>
            <RouterLink :to="link" class="meta-chat"><span class="fa fa-comment mr-1 ml-2"></span>{{ comments }}</RouterLink>
          </p>
        </div>
        <h3 class="heading"><RouterLink :to="link">{{ title }}</RouterLink></h3>
        <p>{{ description }}</p>
        <p><RouterLink :to="link" class="btn btn-secondary py-2 px-3">Đọc thêm</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  date: String,
  author: String,
  comments: Number,
  link: {
    type: String,
    default: '#'
  }
})
</script>

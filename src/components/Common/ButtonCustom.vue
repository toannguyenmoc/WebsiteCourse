<template>
     <button
    class="btn"
    :class="[variant, { disabled }]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
    >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, //primary , pink, white
  disabled: { type: Boolean, default: false }
});

</script>
<style scoped>
.primary {
  color: #fff;
  background-color: #4986fc;
  border: 1px solid #4986fc; 
}

.pink{
background-color: #e449ad;
border:1px solid #e449ad;
  color: white;
}

.white{
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border:1px solid #ffffff;
}
</style>
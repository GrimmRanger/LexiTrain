<template>
  <div class="rail">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.rail {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

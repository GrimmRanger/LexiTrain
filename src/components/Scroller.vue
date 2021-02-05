<template>
  <div class="scroller">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.scroller {
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0.5rem;
}
</style>

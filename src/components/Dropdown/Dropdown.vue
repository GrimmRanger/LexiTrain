<template>
  <select @input="onInput" @click="onClick" @blur="onBlur" :style="{width: width}">
    <option v-for="({value}) in options" :value="value">
      {{value}}
    </option>
  </select>
</template>

<script>
import {ref} from 'vue';

export default {
  props: {
    width: {
      type: Number,
      default: 60,
    },
    options: Array,
  },
  setup(props, {emit}) {
    const open = ref(false);

    const onInput = ($e) => {
      open.value = false;
    }

    const onClick = ($e) => {
      open.value = !open.value;
    }

    const onBlur = ($e) => {
      open.value = false;
    }

    return {
      onInput,
      onClick,
      onBlur,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './dropdown.scss';

@include dropdown1();
// @include dropdown2();
</style>

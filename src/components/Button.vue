<template>
  <button
    :class="getClasses"
    @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
import {computed} from 'vue';

const TYPES = ['standard', 'toggle']

export default {
  props: {
    type: {
      type: String,
      default: 'standard',
      validate: (type) => {
        return TYPES.includes(type);
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const getClasses = computed(() => {
      return {
        [props.type]: true,
        active: props.active,
      };
    });

    const onClick = () => {
      updateToggle();
    };

    const updateToggle = () => {
      if (props.type === 'toggle') {
        emit('update:active', !props.active);
      }
    };

    return {
      getClasses,
      onClick,
      updateToggle,
    };
  }
}
</script>

<style scoped>
button {
  background: #437FBC;
  border: none !important;
  padding: 5px;
  font-size: 1.5rem;
  opacity: 0.6;
  transition: 0.3s;
}

button:focus {
  outline: none;
}

button:hover,
button.active {
  opacity: 1;
}
</style>

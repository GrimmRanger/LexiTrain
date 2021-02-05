<template>
  <div :class="railClasses">
    <slot></slot>
  </div>
</template>

<script>
import {computed} from 'vue';

const JUSTIFICATIONS = [
  'left',
  'right',
  'between',
  'around',
  'center',
];

export default {
  props: {
    justify: {
      type: String,
      default: 'left',
      validate: (val) => {
        return JUSTIFICATIONS.includes(val);
      },
    },
  },
  setup(props) {
    const railClasses = computed(() => {
      return {
        rail: true,
        [props.justify]: true,
      };
    });

    return {
      railClasses,
    };
  }
}
</script>

<style scoped>
.rail {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
}

.left {
  justify-content: flex-start;
}

.right {
  justify-content: flex-end;
}

.between {
  justify-content: space-between;
  flex-wrap: nowrap;
}

.around {
  justify-content: space-around;
}

.center {
  justify-content: center;
}
</style>

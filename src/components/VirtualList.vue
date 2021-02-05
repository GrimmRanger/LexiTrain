<template>
  <div
    ref="list"
    class="list"
    @scroll.passive="onScroll">
    <div v-if="isLoading" class="loaderWrapper">
      <Loader class="loader"></Loader>
    </div>
    <div
      v-else
      ref="scroll"
      class="scroll"
      :style="scrollStyle">
      <div
        class="item"
        v-for="item in itemsToRender"
        :style="itemStyle(item)">
        <slot v-bind="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue';
import Loader from './Loader.vue';

export default {
  components: {
    Loader,
  },
  props: {
    isLoading: Boolean,
    height: Number,
    itemHeight: Number,
    items: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const list = ref(null);
    const scroll = ref(null);
    const scrollTop = ref(0);

    const listHeight = computed(() => {
      return list.value && list.value.clientHeight || 0;
    });
    const scrollHeight = computed(() => {
      return numItems.value * props.itemHeight;
    });
    const scrollStyle = computed(() => {
      return {
        height: `${scrollHeight.value}px`,
      };
    });
    const onScroll = ($e) => {
      scrollTop.value = $e.target.scrollTop;
    }

    const numItems = computed(() => {
      return props.items.length - 1;
    });
    const startIndex = computed(() => {
      return Math.floor(scrollTop.value / props.itemHeight);
    });
    const endIndex = computed(() => {
      const lastIndex = numItems.value - 1;
      const scrollBottom = scrollTop.value + listHeight.value;
      const scrollIndex = Math.floor(scrollBottom / props.itemHeight);
      return Math.min(lastIndex, scrollIndex);
    });
    const itemsToRender = computed(() => {
      const start = startIndex.value || 0;
      const end = endIndex.value || 0;
      const bufferedStart = Math.max(0, start - 2);
      const bufferedEnd = Math.min(end + 2, props.items.length);

      const items = [];
      for (let i = bufferedStart; i <= bufferedEnd; i++) {
        const item = props.items && props.items[i];
        if (item) {
          item.top = props.itemHeight * i;
          items.push(item);
        }
      }
      return items;
    });
    const itemStyle = (item) => {
      return {
        top: `${item.top}px`,
      };
    };

    return {
      list,
      scroll,
      listHeight,
      scrollHeight,
      scrollStyle,
      onScroll,
      numItems,
      startIndex,
      endIndex,
      itemsToRender,
      itemStyle,
    };
  },
}
</script>

<style scoped>
.list {
  overflow-y: auto;
}
.scroll {
  position: relative;
}
.item {
  position: absolute;
  width: 100%;
}
.loaderWrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 50px;
}
</style>

<template>
  <div class="wrapper">
    <div class="label">
      <div class="name">{{word.word[0]}}</div>
      <div class="pos">({{getPos(word.pos)}})</div>
    </div>
    <div class="definition">{{word.gloss}}</div>
  </div>
</template>

<script>
import {computed} from 'vue';

export default {
  props: {
    word: {
      type: Object,
      default: {
        word: [],
        pos: '',
        gloss: '',
      },
    },
  },
  setup() {
    const getPos = (pos) => {
      return pos === 's' ? 'a' : pos;
    }

    return {
      getPos,
    };
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 0.5rem;
}
.label {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin-bottom: 0.5rem;
}

.name {
  display: inline-block;
  margin-right: 5px;
  font-size: 1.5rem;
  font-weight: 400;
}

.pos {
  display: inline-block;
  font-size: 1rem;
  color: red;
}

.definition {
  flex-grow: 1;
  padding-left: 1rem;
  display: -webkit-box;
 -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow-y:hidden;
  text-overflow: ellipsis;
}
</style>

<template>
  <RailV class="rail">
    <div class="header"> LexiTrain </div>
    <FullList></FullList>
  </RailV>
</template>

<script>
import {ref, onMounted} from 'vue';
// import fullDict from './logic/dictionary';
import RailV from './components/RailV.vue';
import FullList from './components/FullList.vue';

export default {
  name: 'LexiTrain',
  components: {
    RailV,
    FullList,
  },
  setup() {
    const dictionary = ref([]);
    // const buildDictionary = () => {
    //   dictionary.value = fullDict;
    // }

    // onMounted(buildDictionary)

    return {
      dictionary,
      // buildDictionary,
    };
  }
}
</script>

<style scoped>
.rail {
  /* background-color: #777777; */
}

.header {
  font-size: 4rem;
  font-weight: bold;
  border-bottom: 3px solid black;
  text-align: center;
}
</style>

<template>
  <RailH class="options" :justify="'between'">
    <div>word count: {{wordCount}}</div>
    <div class="rightOps">
      <Dropdown :options="sortOps" :value="sortOp" @input="sortChanged"></Dropdown>
      <Dropdown :options="letters" :value="letter" @input="letterChanged"></Dropdown>
    </div>
  </RailH>
  <VirtualList
    ref="list"
    class="list"
    :isLoading="isLoading"
    :itemHeight="110"
    :items="getWordList">
    <template #default="word">
      <WordBasic class="word" :word="word"></WordBasic>
    </template>
  </VirtualList>
</template>

<script>
import {ref, computed} from 'vue';
import RailH from './RailH.vue';
import WordBasic from './WordBasic.vue';
import VirtualList from './VirtualList.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import WorkerBee from '../logic/workerBee.js';

export default {
  components: {
    RailH,
    Dropdown,
    WordBasic,
    VirtualList,
  },
  setup(props) {
    const isLoading = ref(false);

    const letter = ref('All');
    const letters = computed(() => {
      const ops = [];
      let i = 'A'.charCodeAt(0);
      const j = 'Z'.charCodeAt(0);
      for (; i <= j; ++i) {
        ops.push({value: String.fromCharCode(i)});
      }
      ops.unshift({value: 'All'});
      return ops;
    });
    const letterChanged = () => {
      console.log('letterChanged');
    }

    const sortOp = ref('ascending');
    const sortOps = computed(() => {
      return [
        {value: 'ascending'},
        {value: 'descending'},
      ];
    });
    const isAscending = computed(() => {
      return sortOp.value === 'ascending';
    });
    const sortChanged = (e) => {
      sortOp.value = isAscending.value ? 'descending' : 'ascending';
      getWords();
    }

    const getWords = () => {
      if (dictInit) {
        isLoading.value = true;
        dict.postMessage({msg: 'get', order: isAscending.value});
      }
    }
    const onDict = ({data}) => {
      (new Response(data)).json()
      .then(res => {
        const {msg} = res;
        if (msg === 'init') {
          dictInit = true;
          getWords();
        } else if (msg === 'dict') {
          wordList.value = res.words;
          isLoading.value = false;
        }
      })
    };
    const onDictError = (e) => {
      isLoading.value = false;
      console.log('onError: ', e);
    };
    let dictInit = false;
    const initDict = () => {
      isLoading.value = true;
      const dict = new Worker('src/logic/dictionary.js', {type: 'module'});
      dict.onmessage = onDict;
      dict.onerror = onDictError;
      dict.postMessage({msg: 'init'});
      return dict;
    }
    const dict = initDict();

    const wordList = ref([]);
    const getWordList = computed(() => {
      return wordList.value;
    });
    const wordCount = computed(() => {
      return wordList.value && wordList.value.length || 0;
    });
 
    return {
      letters,
      letter,
      letterChanged,
      sortOps,
      sortOp,
      sortChanged,
      getWordList,
      wordCount,
      isLoading,
    };
  }
}
</script>

<style scoped>
.options {
  height: 60px;
  padding: 6px;
}

.rightOps select {
  margin-left: 5px;
}

.list {
  width: 100%;
  height: 100%;
  border: 2px solid black;
  box-shadow: 0 0 5px inset black;
}

.word {
  width: 100%;
  height: 110px;
}
</style>

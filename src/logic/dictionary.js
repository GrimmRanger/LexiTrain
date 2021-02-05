import {map} from "lodash-es";

const posMap = {
  noun: ['n'],
  verb: ['v'],
  adverb: ['r'],
  adjective: ['a', 's'],
};

let dict;
let words;
const init = async () => {
  const url = '../assets/dictionary.json';
  const dictString = await fetch(url);
  const dictJson = await dictString.json();
  dict = dictJson;
  words = map(dict.synset, (val, key) => {
    return {[val.word[0]]: key};
  });
  postMessage(JSON.stringify({msg: 'init'}));
}

const alphabetize = (ascending) => {
  const mod = ascending ? 1 : -1;
  return (a, b) => {
    return (Object.keys(a)[0].localeCompare(Object.keys(b)[0])) * mod;
  }
}
const sortWords = (ascending) => {
  words.sort(alphabetize(ascending));
}
const get = ({order}) => {
  sortWords(order);
  const selection = map(words, (val) => {
    return dict.synset[Object.values(val)[0]];
  });
  postMessage(JSON.stringify({msg: 'dict', words: selection}))
}

onmessage = function({data}) {
  const {msg} = data;

  if (msg === 'init') {
    init();
  } else if (msg === 'get') {
    get(data);
  }
}



// // const aFilter = async (a = [], check) => {
// //   return new Promise(async (res, rej) => {
// //     const filtered = [];
// //     for (const [index, item] of a.entries()) {
// //       if (await check(item, index, a)) {
// //         filtered.push(item);
// //       }
// //     }
// //     res(filtered);
// //   });

// // }

// // const aSort = (a = [], check) => {
// //   const [h, ...t] = a;

// //   return new Promise(async (res, rej) => {
// //     if (!h) return res([])

// //     const sortLeft = aSort(await aFilter(t, (a) => check(a, h)), check);
// //     const sortRight = aSort(await aFilter(t, (a) => check(h, a)), check);
// //     Promise.all([sortLeft, sortRight])
// //     .then(([left, right]) => {
// //       res(left.concat(h, right));
// //     }).catch(rej);
// //   });
// // };

// // export {
// //   aFilter,
// //   aSort,
// // };

import {filter} from 'lodash-es';
import {parse} from './jsonfn.js';

// const aFilter = async (a = [], check) => {
//   return new Promise(async (res, rej) => {
//     const filtered = [];
//     for (const [index, item] of a.entries()) {
//       if (await check(item, index, a)) {
//         filtered.push(item);
//       }
//     }
//     res(filtered);
//   });

// }

// const aSort = (a = [], check) => {
//   const [h, ...t] = a;

//   return new Promise(async (res, rej) => {
//     if (!h) return res([])

//     const sortLeft = aSort(await aFilter(t, (a) => check(a, h)), check);
//     const sortRight = aSort(await aFilter(t, (a) => check(h, a)), check);
//     Promise.all([sortLeft, sortRight])
//     .then(([left, right]) => {
//       res(left.concat(h, right));
//     }).catch(rej);
//   });
// };

// export {
//   aFilter,
//   aSort,
// };

let dict = {};
let items = [];

const parseToItems = (e) => {
  const {json} = e;
  dict = json;
};

const buildItems = () => {
  items = filter(dict.synset, set => set);
}

const getItems = () => {
  postMessage(JSON.stringify(items));
}

const sortItems = (e) => {
  const {comp} = e;
  items.sort(comp);
  getItems();
}

onmessage = function(e) {
  // const res = parse(e.data);
  (new Response(e.data)).json()
  .then(res => {
    const {message} = res;
  
    if (message === 'init') {
      // parseToItems(res);
      // buildItems();
      console.log('init');
      postMessage(JSON.stringify({val: 'response to init'}));
    } else if (message === 'get') {
      getItems();
    } else if (message === 'sort') {
      sortItems(res);
    }
  })
}

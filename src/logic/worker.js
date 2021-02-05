onmessage = (e) => {
  console.log('onmessage: ', e);
  postMessage('hey');
  // (new Response(e.data)).json()
  // .then(res => {
  //   postMessage('message received');
  // })
}
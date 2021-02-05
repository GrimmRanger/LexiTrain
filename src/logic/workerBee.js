export default (filepath) => {
  return new Promise((res, rej) => {
    if (window.Worker) {
      res(new Worker(filepath, {type: 'module'}));
    } else {
      rej('Worker not available on window.');
    }
  });
}

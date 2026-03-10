import print from '../src/index.js';

const messageAwait = print('Waiting');

setTimeout(() => messageAwait.fail(), 1000);

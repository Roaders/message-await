import { print } from '../src';

const messageAwait = print('Waiting');

setTimeout(() => messageAwait.fail(), 1000);

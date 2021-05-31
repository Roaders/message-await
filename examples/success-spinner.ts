import { print } from '../src';
import chalk from 'chalk';

const messageAwait = print('Loading the thing', true, chalk.blue);

setTimeout(() => messageAwait.success('The thing loaded'), 2000);

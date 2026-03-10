import print from '../src/index.js';
import chalk from 'chalk';

const messageAwait = print('Loading the thing', { spinner: true, format: chalk.blue });

setTimeout(() => messageAwait.success('The thing loaded'), 2000);

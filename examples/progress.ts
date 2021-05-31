import { print } from '../src';
import chalk from 'chalk';

const messageAwait = print('Loading', true, chalk.blue);

let count = 0;
const total = 5;

function onTimer() {
    count++;
    const message = `Loading ${count}/${total}`;
    if (count === total) {
        clearInterval(timer);
        messageAwait.success(message);
    } else {
        messageAwait.updateMessage(message);
    }
}

const timer = setInterval(onTimer, 400);

import print from '../src';
import chalk from 'chalk';

const messageAwait = print('Loading', true, chalk.blue);

const duration = 5000;
const start = Date.now();

let firstSecond = false;

function onTimer() {
    const elapsed = Math.min(Date.now() - start, duration);
    const message = `Loading ${elapsed}/${duration}`;
    if (elapsed >= duration) {
        clearInterval(timer);
        messageAwait.success(message);
    } else {
        if (elapsed > 1000 && !firstSecond) {
            firstSecond = true;
            messageAwait.log('First second done');
        }
        messageAwait.updateMessage(message);
    }
}

const timer = setInterval(onTimer, 100);

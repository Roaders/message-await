import print from '../src';
import chalk from 'chalk';

const messageAwait = print('Loading', { spinner: true, format: chalk.blue });

const duration = 5000;
const start = Date.now();

function onTimer() {
    const elapsed = Math.min(Date.now() - start, duration);
    const message = `Loading ${elapsed}/${duration}`;
    if (elapsed >= duration) {
        clearInterval(timer);
        messageAwait.success(message);
    } else {
        messageAwait.updateMessage(message);
    }
}

const timer = setInterval(onTimer, 100);

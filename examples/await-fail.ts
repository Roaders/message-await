import print from '../src';
import chalk from 'chalk';

async function awaitFail() {
    const examplePromise = new Promise((_resolve, reject) => {
        setTimeout(reject, 1500, 'Error: something went wrong');
    });

    const result = await print('Waiting', { spinner: true, format: chalk.blue }).await(
        examplePromise,
        true,
        true,
        'Done',
        'Fail'
    );
    console.log(`await complete: '${result}'`);
}

awaitFail();

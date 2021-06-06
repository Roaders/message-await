import print from '../src';
import chalk from 'chalk';

async function awaitSuccess() {
    const examplePromise = new Promise((resolve) => {
        setTimeout(resolve, 1500, 'returned result');
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

awaitSuccess();

import print from '../src';
import chalk from 'chalk';

async function awaitSuccess() {
    const examplePromise = new Promise((resolve) => {
        setTimeout(resolve, 1500, 'returned result');
    });

    const result = await print('Waiting', true, chalk.blue).await(examplePromise, true, true, 'Done', 'Fail');
    console.log(`await complete: '${result}'`);
}

awaitSuccess();

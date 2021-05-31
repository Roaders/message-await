# message-await

> A utility to print message with an async success or failure in node.js

## Installation

```bash
npm install message-await
```

## Why Use This?

It's a really simple way of giving your user feedback that we are waiting for something and then to give feedback on success or failure:

![Spinner Animation](https://github.com/Roaders/message-await/raw/master/assets/spinner.gif)

## Usage

```ts
import print from 'message-await';

const messageAwait = print('Loading the thing', true, chalk.blue);

await someAsyncProcess;

messageAwait.success('The thing loaded');
```

## Examples

### Success or Failure

```ts
import print from 'message-await';

const messageAwait = print('Loading the thing', true, chalk.blue);

await someAsyncProcess;

messageAwait.success("optional complete message");
// OR: messageAwait.fail("optional fail message");
// OR: messageAwait.complete(true, "optional message")
// OR: messageAwait.complete(false)
```

### Progress

```ts
import print from '../src';
import chalk from 'chalk';

const messageAwait = print('Loading', true, chalk.blue);

function onProgressCallback(complete: number, total: number){
    messageAwait.updateMessage(`Loading ${complete}/${total}`);
}

function onCompleteCallback(total: number){
    messageAwait.success(`Loading ${complete}/${total}`);
}

someAsyncFunction(onProgressCallback, onCompleteCallback);
```
![Progress Animation](https://github.com/Roaders/message-await/raw/master/assets/progress.gif)

### Await

```ts
    const result = await print('Waiting', true, chalk.blue).await(somePromise, false, false, 'Done');
```
#### Success
![Await Success Example](https://github.com/Roaders/message-await/raw/master/assets/awaitSuccess.gif)

#### Fail
![Await Fail Example](https://github.com/Roaders/message-await/raw/master/assets/awaitFail.gif)

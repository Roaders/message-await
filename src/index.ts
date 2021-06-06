import { clearLine, cursorTo } from 'readline';
import { hide, show } from 'cli-cursor';
import { MessageAwait, MessageAwaitOptions } from './contracts';
import { defaultOptions } from './constants';

export * from './contracts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logSymbols = require('log-symbols');

/**
 * prints the initial message
 * @param message - message to display
 * @param options - MessageAwaitOptions
 * @returns MessageAwait - options to complete the message when done or update the message with progress info
 */
export default function print(message: string, options?: Partial<MessageAwaitOptions>): MessageAwait {
    const requiredOptions = { ...defaultOptions, ...options };
    let timeout: NodeJS.Timeout | undefined;
    let isComplete = false;

    let dotCount = 3;

    function generateMessage() {
        let dots = Array.from({ length: dotCount })
            .map(() => '.')
            .join('');

        while (dots.length < 3) {
            dots = dots + ' ';
        }

        return requiredOptions.format(message + dots);
    }

    function resetCursor() {
        cursorTo(process.stdout, 0);
        clearLine(process.stdout, 1);
    }

    function writeMessage() {
        resetCursor();
        process.stdout.write(generateMessage());
    }

    function startTimer() {
        dotCount = 0;
        writeMessage();

        timeout = setInterval(() => {
            switch (dotCount) {
                case 3:
                    dotCount = 0;
                    writeMessage();
                    break;
                default:
                    dotCount++;
                    writeMessage();
            }
        }, 300).unref();
    }

    function updateMessage(messageUpdate: string, spinner?: boolean) {
        if (isComplete) {
            throw new Error(`Progress Message is complete`);
        }
        if (spinner === true && timeout == null) {
            startTimer();
        } else if (spinner === false && timeout != null) {
            dotCount = 0;
            clearInterval(timeout);
            timeout = undefined;
        }

        message = messageUpdate;
        writeMessage();
    }

    function log(logMessage: string, ...optional: unknown[]) {
        if (isComplete) {
            throw new Error(`Progress Message is complete`);
        }
        resetCursor();
        console.log(logMessage, ...optional);
        writeMessage();
    }

    function complete(success = true, updateMessage?: string) {
        isComplete = true;
        if (timeout != null) {
            clearInterval(timeout);
        }

        dotCount = 3;

        resetCursor();
        message = updateMessage || message;

        if (success) {
            console.log(`${generateMessage()} ${logSymbols.success}`);
        } else {
            console.log(`${generateMessage()} ${logSymbols.error}`);
        }

        if (requiredOptions.hideCursor) {
            show();
        }
    }

    function success(updateMessage?: string) {
        return complete(true, updateMessage);
    }

    function fail(updateMessage?: string) {
        return complete(false, updateMessage);
    }

    function await<T>(
        promise: Promise<T>,
        exitProcess?: boolean,
        printError?: boolean,
        updateSuccessMessage?: string,
        updateFailureMessage?: string
    ): Promise<T> {
        return promise
            .then((value) => {
                complete(true, updateSuccessMessage);
                return value;
            })
            .catch((err) => {
                complete(false, updateFailureMessage);
                if (printError) {
                    console.error(err);
                }
                if (exitProcess) {
                    process.exit();
                }
                return Promise.reject<T>(err);
            });
    }

    function getMessage() {
        return message;
    }

    if (requiredOptions.hideCursor) {
        hide();
    }

    if (requiredOptions.spinner) {
        startTimer();
    } else {
        writeMessage();
    }

    return { complete, log, updateMessage, getMessage, success, fail, await };
}

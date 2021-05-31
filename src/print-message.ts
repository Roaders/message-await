import { clearLine, cursorTo } from 'readline';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logSymbols = require('log-symbols');

export type ResolveMessage = {
    /**
     * awaits the completion of a promise and marks the message as success or failure based on the promise
     * @param promise
     * @param exitProcess - if the promise is rejected exits the node process. Defaults to false
     * @param printError - if the promise is rejected prints the error that is returned. Defaults to false
     * @param updateSuccessMessage - optional. update the message on success
     * @param updateFailureMessage - optional. update the message on rejection
     */
    await: <T>(
        promise: Promise<T>,
        exitProcess?: boolean,
        printError?: boolean,
        updateSuccessMessage?: string,
        updateFailureMessage?: string
    ) => Promise<T>;
    /**
     * marks the message as complete.
     * @param success - defaults to true. Adds a tick or a cross to the message
     * @param updateMessage - optionally updates the displayed message
     */
    complete: (success?: boolean, updateMessage?: string) => void;
    /**
     * Marks the message as complete with a tick.
     * Optionally update the displayed message
     */
    success: (updateMessage?: string) => void;
    /**
     * Marks the message as failed with a cross.
     * Optionally update the displayed message
     */
    fail: (updateMessage?: string) => void;
    /**
     * logs a message whilst waiting for the main message to complete pass any number of items to be logged using console.log
     */
    log: (message: string, ...optional: unknown[]) => void;
    /**
     * Updates the message. For example could display progress: updateMessage(`Loaded 3/4`);
     * Optionally start or stop the spinner.
     */
    updateMessage: (message: string, spinner?: boolean) => void;
    /**
     * gets the currently displayed message
     */
    getMessage: () => string;
};

/**
 * prints the initial message
 * @param message - message to display
 * @param spinner - boolean, defaults to false - indicate progress with animated ellipses
 * @param format - optional, format the displayed message. Can use chalk.blue for example
 * @returns ResolveMessage - options to complete the message when done
 */
export function print(message: string, spinner = false, format?: (message: string) => string): ResolveMessage {
    let timeout: NodeJS.Timeout | undefined;
    let isComplete = false;

    const formatMessage = format || ((value) => value);

    let dotCount = 3;

    function generateMessage() {
        const dots = Array.from({ length: dotCount })
            .map(() => '.')
            .join('');
        return formatMessage(message + dots);
    }

    function resetCursor() {
        cursorTo(process.stdout, 0);
        clearLine(process.stdout, 1);
    }

    function writeMessage() {
        process.stdout.write(generateMessage());
    }

    function startTimer() {
        dotCount = 0;
        writeMessage();

        timeout = setInterval(() => {
            switch (dotCount) {
                case 3:
                    dotCount = 0;
                    cursorTo(process.stdout, message.length);
                    clearLine(process.stdout, 1);
                    break;
                default:
                    dotCount++;
                    process.stdout.write(formatMessage(`.`));
            }
        }, 300).unref();
    }

    if (spinner) {
        startTimer();
    } else {
        writeMessage();
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
        resetCursor();
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

    return { complete, log, updateMessage, getMessage, success, fail, await };
}

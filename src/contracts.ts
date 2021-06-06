export type MessageAwaitOptions = {
    /**
     * Display an animated ellipses (...) at the end of the message
     * Defaults to false
     */
    spinner: boolean;
    /**
     * An optional function to format the message. for example: chalk.blue
     */
    format: (message: string) => string;
    /**
     * If true hides the cursor whilst the message is displayed to avoid flickering.
     * Defaults to true.
     */
    hideCursor: boolean;
};

export type MessageAwait = {
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

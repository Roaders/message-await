import { MessageAwaitOptions } from './contracts.js';

export const defaultOptions: MessageAwaitOptions = {
    spinner: false,
    format: (value) => value,
    hideCursor: true,
};

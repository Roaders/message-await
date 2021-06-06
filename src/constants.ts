import { MessageAwaitOptions } from './contracts';

export const defaultOptions: MessageAwaitOptions = {
    spinner: false,
    format: (value) => value,
    hideCursor: true,
};

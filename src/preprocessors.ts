import { htmlString } from './types/componentType';

export function blankFiller(str: htmlString): htmlString {
    let i = 1;
    return str.replaceAll(/_BLANK_/g, function (whatever: string) {
        return String(i++);
    });
}

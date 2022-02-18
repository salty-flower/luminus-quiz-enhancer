import { hasText } from './types/componentType';
import { qnBox } from './types/otherTypes';
import { qnArrayWrapper, qnData } from './types/qnDataType';

export function match<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[],
    usePartial?: boolean
): T | undefined {
    const bar: qnArrayWrapper<T> = { foo: questionDataEntries };
    return (
        matchHTML(questionBox, bar.foo) ??
        matchTextContent(questionBox, bar.foo) ??
        (usePartial ? matchPartialTextContent(questionBox, bar.foo) : undefined)
    );
}

export function matchHTML<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
    console.log(questionDataEntries.length);
    for (const questionDataEntry of questionDataEntries.filter(item => item !== undefined)) {
        if (questionDataEntry.text == questionBox.innerHTML) {
            return questionDataEntry;
        }
    }
    return undefined;
}

export function matchTextContent<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
    console.log(questionDataEntries.length);
    for (const questionDataEntry of questionDataEntries.filter(item => item !== undefined)) {
        const tmpElement: Element = document.createElement('div');
        tmpElement.innerHTML = questionDataEntry.text;

        if (tmpElement.textContent == questionBox.textContent) {
            return questionDataEntry;
        }
    }
    return undefined;
}

function matchPartialTextContent<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
    console.log(questionDataEntries.length);
    for (const questionDataEntry of questionDataEntries.filter(item => item !== undefined)) {
        const tmpElement: Element = document.createElement('div');
        tmpElement.innerHTML = questionDataEntry.text;

        if (!(tmpElement.textContent && questionBox.textContent)) {
            return undefined;
        } else {
            const quarter = (tmpElement.textContent.length / 4) | 0;
            const full = tmpElement.textContent.length;
            if (
                tmpElement.textContent.substring(0, quarter) ==
                    questionBox.textContent.substring(0, quarter) ||
                tmpElement.textContent.substring(quarter, full) ==
                    questionBox.textContent.substring(quarter, full)
            ) {
                return questionDataEntry;
            }
        }
    }
    console.log('Warning: one question data not found\n==============');
    console.log(questionBox);
    console.log('==============');
    return undefined;
}

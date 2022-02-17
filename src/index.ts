import { htmlString } from './types/componentType';
import { pair, qnBox } from './types/otherTypes';
import { polyfillData } from './types/polyfillDataType';
import { qnData } from './types/qnDataType';

// @ts-ignore
function main(inputJSON: polyfillData) {
    const rawQuestionBoxes = document.getElementsByTagName('quiz-question-view');
    const questionBoxes: qnBox[] = Array.prototype.slice
        .call(rawQuestionBoxes)
        .map((item: qnBox): qnBox => {
            return (
                item
                    .getElementsByClassName('question-header')[0]
                    .getElementsByTagName('katex')[0] ??
                item
                    .getElementsByClassName('question-type')[0]
                    .getElementsByTagName('question-view-fib')[0]
                    .getElementsByTagName('katex')[0]
            ).getElementsByTagName('span')[0];
        });
    console.log(extract(questionBoxes, inputJSON));
}

function extract(questionBoxes: qnBox[], networkJSON: polyfillData): pair[] {
    const result: pair[] = [];
    const { data } = networkJSON;

    data.map((item: qnData) => {
        item.text = blankFiller(item.text);
        return item;
    });

    for (const questionBox of questionBoxes) {
        result.push({
            qnNode: questionBox as qnBox,
            qnData:
                strictMatch(questionBox, data) ??
                looseMatch(questionBox, data) ??
                crazyMatch(questionBox, data)
        });
    }

    return result;
}

function strictMatch(questionBox: qnBox, questionDataEntries: qnData[]): qnData | undefined {
    for (const questionDataEntry of questionDataEntries) {
        if (questionDataEntry.text == questionBox.innerHTML) {
            return questionDataEntry;
        }
    }
    return undefined;
}

function looseMatch(questionBox: qnBox, questionDataEntries: qnData[]): qnData | undefined {
    for (const questionDataEntry of questionDataEntries) {
        const tmpElement: Element = document.createElement('div');
        tmpElement.innerHTML = questionDataEntry.text;

        if (tmpElement.textContent == questionBox.textContent) {
            return questionDataEntry;
        }
    }
    return undefined;
}

function crazyMatch(questionBox: qnBox, questionDataEntries: qnData[]): qnData | undefined {
    for (const questionDataEntry of questionDataEntries) {
        const tmpElement: Element = document.createElement('div');
        tmpElement.innerHTML = questionDataEntry.text;

        if (!(tmpElement.textContent && questionBox.textContent)) {
            return undefined;
        } else {
            const half = (tmpElement.textContent.length / 2) | 0;
            const full = tmpElement.textContent.length;
            if (
                tmpElement.textContent.substring(0, half) ==
                    questionBox.textContent.substring(0, half) ||
                tmpElement.textContent.substring(half, full) ==
                    questionBox.textContent.substring(half, full)
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

function blankFiller(str: htmlString): htmlString {
    let i = 1;
    return str.replaceAll(/_BLANK_/g, function (whatever: string) {
        return String(i++);
    });
}

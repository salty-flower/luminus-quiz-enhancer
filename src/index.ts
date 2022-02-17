import { htmlString } from './types/componentType';
import { pair, qnBox } from './types/otherTypes';
import { polyfillData } from './types/polyfillDataType';
import { qnData } from './types/qnDataType';

// @ts-ignore
function main(inputJSON: polyfillData) {
    const questionBoxes = document.getElementsByTagName('quiz-question-view');
    console.log(extract(questionBoxes, inputJSON));
}

function extract(questionBoxes: HTMLCollectionOf<Element>, networkJSON: polyfillData): pair[] {
    const result: pair[] = [];
    const { data } = networkJSON;

    data.map((item: qnData) => {
        item.text = blankFiller(item.text);
        return item;
    });

    for (const questionBox of questionBoxes) {
        result.push({
            qnNode: questionBox as qnBox,
            qnData: strictMatch(questionBox, data) ?? looseMatch(questionBox, data)
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
        const { textContent } = tmpElement;

        if (textContent == questionBox.textContent) {
            return questionDataEntry;
        }
    }
    return undefined;
}

function blankFiller(str: htmlString): htmlString {
    let i = 1;
    return str.replaceAll(/_BLANK_/g, function (whatever: string) {
        return String(i++);
    });
}

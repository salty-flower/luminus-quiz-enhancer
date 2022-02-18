import { hasText, htmlString } from './types/componentType';
import { pair, qnBox } from './types/otherTypes';
import { polyfillData } from './types/polyfillDataType';
import { qnData, qnDataFIB, qnDataMRQ } from './types/qnDataType';

// @ts-ignore
function main(inputJSON: polyfillData) {
    const rawQuestionBoxes = document.getElementsByTagName('quiz-question-view');
    const pairs = extract(rawQuestionBoxes, inputJSON);
    console.log(pairs);
    pairs.map(fill);
}

function extract(rawQuestionBoxes: HTMLCollectionOf<Element>, networkJSON: polyfillData): pair[] {
    const { data } = networkJSON;

    data.map((item: qnData) => {
        item.text = blankFiller(item.text);
        return item;
    });

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

    // for (const questionBox of questionBoxes) {
    //     result.push({
    //         qnNode: questionBox as qnBox,
    //         qnData: match(questionBox, data)
    //     });
    // }

    return questionBoxes.map(
        (item: qnBox, index: number) =>
            ({
                qnNode: rawQuestionBoxes[index],
                qnData: match(item, data)
            } as pair)
    );
}

function fill(p: pair) {
    switch (p.qnData?.type) {
        case 'FIB':
            fillFIB(p as pair<qnDataFIB>);
            break;
        case 'MCQ':
            fillMRQ(p as pair<qnDataMRQ>);
            break;
        case 'MRQ':
            fillMRQ(p as pair<qnDataMRQ>);
            break;
        case 'TOF':
            fillTOF(p);
            break;
    }
    return;
}

function fillTOF(p: pair) {}

function fillMRQ(p: pair<qnDataMRQ>) {
    interface pairedOption {
        checkbox: HTMLInputElement | null;
        optionText: Element | null;
    }
    const optionContents = p.qnNode.querySelectorAll(
        '.question-view > quiz-question-view:nth-child(2) > div:nth-child(2) > question-view-mrq:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div > .option-content'
    );
    const boxTextPairs: pairedOption[] = Array.prototype.slice
        .call(optionContents)
        .map((item: Element) => ({
            checkbox: item.querySelector('label.checkbox > input'),
            optionText: item.querySelector('div.text > span > katex > span')
        }));
    // const selectedOptions = p.qnData!.response.options.map(
    //     (item: number) => p.qnData!.sortedOptions.filter()
    // );
    const selectedOptions = p.qnData!.sortedOptions.filter(item =>
        p.qnData!.response.options.includes(item.order)
    );
    for (const boxTextPair of boxTextPairs) {
        if (boxTextPair.optionText) {
            const myMatch = looseMatch(boxTextPair.optionText, selectedOptions);
            if (myMatch !== undefined) {
                console.log(boxTextPair.optionText);
                console.log(myMatch);
                console.log('\n\n\n\n\n\n\n\n');
                boxTextPair.checkbox?.click();
            }
        }
    }
}

function fillFIB(p: pair<qnDataFIB>) {
    const blanks: NodeListOf<HTMLInputElement> = p.qnNode.querySelectorAll(
        '.question-view > quiz-question-view:nth-child(2) > div:nth-child(2) > question-view-fib:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div.input > input'
    );
    // const blanksArray = Array.prototype.slice.call(blanks);
    for (let i = 0; i < blanks.length; i++) {
        blanks[i].value = p.qnData?.response.lstAnswer[i]!;
        const evt = new InputEvent('input', {
            bubbles: true
        });
        blanks[i].dispatchEvent(evt);
    }
}

function match<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
    return (
        strictMatch(questionBox, questionDataEntries) ??
        looseMatch(questionBox, questionDataEntries) ??
        crazyMatch(questionBox, questionDataEntries)
    );
}

function strictMatch<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
    for (const questionDataEntry of questionDataEntries.filter(item => item !== undefined)) {
        if (questionDataEntry.text == questionBox.innerHTML) {
            return questionDataEntry;
        }
    }
    return undefined;
}

function looseMatch<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
    for (const questionDataEntry of questionDataEntries.filter(item => item !== undefined)) {
        const tmpElement: Element = document.createElement('div');
        tmpElement.innerHTML = questionDataEntry.text;

        if (tmpElement.textContent == questionBox.textContent) {
            return questionDataEntry;
        }
    }
    return undefined;
}

function crazyMatch<T extends hasText = qnData>(
    questionBox: qnBox,
    questionDataEntries: T[]
): T | undefined {
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

function blankFiller(str: htmlString): htmlString {
    let i = 1;
    return str.replaceAll(/_BLANK_/g, function (whatever: string) {
        return String(i++);
    });
}

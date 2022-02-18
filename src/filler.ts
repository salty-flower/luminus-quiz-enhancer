import { matchTextContent } from './matcher';
import { pair } from './types/otherTypes';
import { qnDataFIB, qnDataMRQ, qnDataTOF } from './types/qnDataType';

export function fill(p: pair) {
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
            fillTOF(p as pair<qnDataTOF>);
            break;
    }
    return;
}

export function fillTOF(p: pair<qnDataTOF>) {
    const tofInputs: NodeListOf<HTMLInputElement> = p.qnNode.querySelectorAll(
        '.question-view > quiz-question-view:nth-child(2) > div:nth-child(2) > question-view-tof:nth-child(1) > form:nth-child(1) > div > div > label > input'
    );
    switch (p.qnData?.response.tof) {
        case true:
            tofInputs[0].click();
            break;
        case false:
            tofInputs[1].click();
            break;
    }
    return;
}

export function fillMRQ(p: pair<qnDataMRQ>) {
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
    const selectedOptions = p.qnData!.sortedOptions.filter(item =>
        p.qnData!.response.options.includes(item.order)
    );
    for (const boxTextPair of boxTextPairs) {
        if (boxTextPair.optionText) {
            const myMatch = matchTextContent(boxTextPair.optionText, selectedOptions);
            if (myMatch !== undefined) {
                boxTextPair.checkbox?.click();
            }
        }
    }
}

export function fillFIB(p: pair<qnDataFIB>) {
    const blanks: NodeListOf<HTMLInputElement> = p.qnNode.querySelectorAll(
        '.question-view > quiz-question-view:nth-child(2) > div:nth-child(2) > question-view-fib:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div.input > input'
    );
    for (let i = 0; i < blanks.length; i++) {
        blanks[i].value = p.qnData?.response.lstAnswer[i]!;
        const evt = new InputEvent('input', {
            bubbles: true
        });
        blanks[i].dispatchEvent(evt);
    }
}

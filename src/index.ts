import { fill } from './fillers';
import { match } from './matchers';
import { pair, qnBox } from './types/otherTypes';
import { polyfillData } from './types/polyfillDataType';
import { qnData } from './types/qnDataType';
import { blankFiller } from './preprocessors';

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
            return (item.querySelector('.question-header > span > katex > span') ??
                item.querySelector(
                    '.question-type > question-view-fib > form > div > span > katex > span'
                ))!;
        });

    return questionBoxes.map(
        (item: qnBox, index: number) =>
            ({
                qnNode: rawQuestionBoxes[index],
                qnData: match(item, data, true)
            } as pair)
    );
}

// @ts-ignore
main(JSON.parse(prompt('Please enter the data string.')));

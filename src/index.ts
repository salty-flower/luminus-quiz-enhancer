import { fill } from './filler';
import { match } from './matcher';
import { htmlString } from './types/componentType';
import { pair, qnBox } from './types/otherTypes';
import { polyfillData } from './types/polyfillDataType';
import { qnData } from './types/qnDataType';

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
                qnData: match(item, data, true, true)
            } as pair)
    );
}
function blankFiller(str: htmlString): htmlString {
    let i = 1;
    return str.replaceAll(/_BLANK_/g, function (whatever: string) {
        return String(i++);
    });
}

// @ts-ignore
main(JSON.parse(prompt('Please enter the data string.')));

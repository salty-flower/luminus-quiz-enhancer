"use strict";
exports.__esModule = true;
// @ts-ignore
function main(inputJSON) {
    var questionBoxes = document.getElementsByTagName('quiz-question-view');
    console.log(extract(questionBoxes, inputJSON));
}
function extract(questionBoxes, networkJSON) {
    var _a;
    var result = [];
    var data = networkJSON.data;
    data.map(function (item) {
        item.text = blankFiller(item.text);
        return item;
    });
    for (var _i = 0, questionBoxes_1 = questionBoxes; _i < questionBoxes_1.length; _i++) {
        var questionBox = questionBoxes_1[_i];
        result.push({
            qnNode: questionBox,
            qnData: (_a = strictMatch(questionBox, data)) !== null && _a !== void 0 ? _a : looseMatch(questionBox, data)
        });
    }
    return result;
}
function strictMatch(questionBox, questionDataEntries) {
    for (var _i = 0, questionDataEntries_1 = questionDataEntries; _i < questionDataEntries_1.length; _i++) {
        var questionDataEntry = questionDataEntries_1[_i];
        if (questionDataEntry.text == questionBox.innerHTML) {
            return questionDataEntry;
        }
    }
    return undefined;
}
function looseMatch(questionBox, questionDataEntries) {
    for (var _i = 0, questionDataEntries_2 = questionDataEntries; _i < questionDataEntries_2.length; _i++) {
        var questionDataEntry = questionDataEntries_2[_i];
        var tmpElement = document.createElement('div');
        tmpElement.innerHTML = questionDataEntry.text;
        var textContent = tmpElement.textContent;
        if (textContent == questionBox.textContent) {
            return questionDataEntry;
        }
    }
    return undefined;
}
function blankFiller(str) {
    var i = 1;
    return str.replaceAll(/_BLANK_/g, function (whatever) {
        return String(i++);
    });
}

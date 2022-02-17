export type UUID = string; // '6f7d90f1-6fd1-4d99-9168-022cc47253d7'
export type htmlString = string;
export type timeString = string;

export interface ansOrFeedback {
    order: number;
    caseSensitive: boolean;
    characterLimit?: number;
    onlyNumericAnswers: boolean;
}

export interface responseCore {
    id: UUID;
    questionID: UUID;
    createdDate: timeString;
    creatorID: UUID;
}

export interface responseFIB extends responseCore {
    lstAnswer: string[];
}

export interface responseTOF extends responseCore {
    tof: boolean;
}

export interface responseMCQ extends responseCore {
    options: number[];
    text: string;
}

export type response = responseFIB | responseMCQ | responseTOF;

export interface option {
    order: number;
    text: htmlString;
}

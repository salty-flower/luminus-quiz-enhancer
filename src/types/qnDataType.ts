import {
    ansOrFeedback,
    htmlString,
    option,
    response,
    responseFIB,
    responseMCQ,
    responseTOF,
    timeString,
    UUID
} from './componentType';

interface qnDataCore {
    id: UUID;
    resourceID: UUID;
    parentID: UUID;
    forAssessment: boolean;
    text: htmlString;
    publish: boolean;
    mark: number;
    requireRationale: boolean;
    createdDate: timeString;
    lastUpdatedDate: timeString;
    response: response;
    kutags: [];
}

export interface qnDataFIB extends qnDataCore {
    answersAndFeedbacks: ansOrFeedback[];
    type: 'FIB';
    response: responseFIB;
}

export interface qnDataMCQ extends qnDataCore {
    recommendMarkingScheme: number;
    sortedOptions: option[];
    response: responseMCQ;
}

export interface qnDataMRQ extends qnDataMCQ {
    restrictSelection: number;
}

export interface qnDataTOF extends qnDataCore {
    response: responseTOF;
}

export type qnData = qnDataFIB | qnDataMCQ | qnDataMRQ | qnDataTOF;

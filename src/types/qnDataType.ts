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
    type: 'FIB' | 'MCQ' | 'TOF' | 'MRQ';
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
    type: 'MCQ';
    recommendMarkingScheme: number;
    sortedOptions: option[];
    response: responseMCQ;
}

export interface qnDataMRQ extends qnDataCore {
    type: 'MRQ';
    recommendMarkingScheme: number;
    sortedOptions: option[];
    restrictSelection: number;
    response: responseMCQ;
}

export interface qnDataTOF extends qnDataCore {
    type: 'TOF';
    response: responseTOF;
}

export type qnData = qnDataFIB | qnDataMCQ | qnDataMRQ | qnDataTOF;

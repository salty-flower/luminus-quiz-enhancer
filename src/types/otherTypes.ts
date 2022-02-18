import { qnData } from './qnDataType';

export interface pair<T = qnData> {
    qnNode: Element;
    qnData: T | undefined;
}

export type qnBox = Element;

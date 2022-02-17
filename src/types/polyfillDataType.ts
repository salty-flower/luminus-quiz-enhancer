import { qnData } from './qnDataType';

export interface polyfillData {
    status: 'success';
    code: number;
    total: number;
    offset: number;
    data: qnData[];
}

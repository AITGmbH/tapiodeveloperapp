export interface HistoricalDataResponse {
    values: HistoricalDataResponseElement[];
}
export interface HistoricalDataResponseElement {
    key: string;
    values: HistoricItemData[];
    moreDataAvailable: boolean;
}

export interface HistoricItemData {
    rts_utc: string;
    k: string;
    vt: string;
    v: unknown;
    vNum?: number;
    u: string;
    q: string;
    sts: string;
    rts: string;
}

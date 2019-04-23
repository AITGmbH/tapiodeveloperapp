import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Provides access to the tapio subscriptions.
 */
@Injectable()
export class HistoricConditionsService {
    constructor(private readonly http: HttpClient) {}

    public getHistoricConditions(
        machineId: string,
        req: HistoricConditionsRequest
    ): Observable<ConditionData[]> {
        return this.http
            .post<HistoricConditionsResponse>(
                `/api/historicConditions/${machineId}`,
                req
            )
            .pipe(map(r => r.values));
    }
}

/***
 * Provides an overview of the condition data.
 */
export class HistoricConditionsRequest {
    from?: Date;
    to?: Date;
}

export class HistoricConditionsResponse {
    values: ConditionData[];
}

export class ConditionData {
    key: string;
    provider: string;

    values: Entry[];
}

export class Entry {
    sts: Date;

    rts_utc_start?: Date;

    rts_start?: Date;

    rts_utc_end?: Date;

    rts_end?: Date;

    rts_utc_end_quality: string;

    p: string;

    k: string;

    s: string;

    sv: string;

    ls: any;

    lm: any;

    vls: any;
}

export class FlatConditionDataEntry {
    key: string;
    provider: string;

    sts: Date;

    rts_utc_start?: Date;

    rts_start?: Date;

    rts_utc_end?: Date;

    rts_end?: Date;

    rts_utc_end_quality: string;

    p: string;

    k: string;

    s: string;

    sv: string;

    ls: any;

    lm: any;

    vls: any;

    duration?: string;
}

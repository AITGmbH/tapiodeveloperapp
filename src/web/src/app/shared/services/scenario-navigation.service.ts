import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ScenarioEntry } from "../models/scenario-entity.model";

/**
 * Provides access to the scenario navigation entries.
 */
@Injectable({ providedIn: "root" })
export class ScenarioNavigationService {

    constructor(private http: HttpClient) { }

    public getEntries(): Observable<ScenarioEntry[]> {
        return this.http.get<ScenarioEntry[]>("/api/scenario");
    }
}



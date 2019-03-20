import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Provides access to the scenario navigation entries.
 */
@Injectable({ providedIn: 'root' })
export class ScenarioNavigationService {

    constructor(private readonly http: HttpClient) { }

    getEntries(): Observable<ScenarioEntry[]> {
        return this.http.get<ScenarioEntry[]>('/api/scenario');
    }
}

/**
 * Represents a secanario entry.
 */
export interface ScenarioEntry {
    /**
     * The caption.
     */
    caption: string;
    /**
     * The URL.
     */
    url: string;
}

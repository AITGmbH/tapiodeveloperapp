import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScenarioService {

    constructor(private http: HttpClient) { }

    getModules(): Observable<ScenarioEntry[]> {
        return this.http.get<ScenarioEntry[]>('/api/scenario');
    }
}

export interface ScenarioEntry {
    caption: string;
    url: string;
}

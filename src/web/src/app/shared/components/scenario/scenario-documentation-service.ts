import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ScenarioService {

    constructor(private http: HttpClient) { }

    getUrls(id: string): Observable<DocumentationPaths> {
        return this.http.get<DocumentationPaths>(`/api/documentationPath/${id}`);
    }
}

export interface DocumentationPaths {
    frontend: string;
    backend: string;
}

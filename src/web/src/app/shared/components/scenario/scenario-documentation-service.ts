import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * Provides access to the documentation URLs of a scenario.
 */
@Injectable({ providedIn: "root" })
export class ScenarioDocumentationService {

    constructor(private readonly http: HttpClient) { }

    getUrls(id: string): Observable<DocumentationPaths> {
        return this.http.get<DocumentationPaths>(`/api/documentationPath/${id}`);
    }
}

/**
 * Represents the documenation paths of a scenario.
 */
export interface DocumentationPaths {
    frontend: string;
    backend: string;
    tapio: string;
}

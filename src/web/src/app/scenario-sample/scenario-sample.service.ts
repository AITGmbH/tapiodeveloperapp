import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Provides access to the hello world controller.
 */
@Injectable({ providedIn: "root" })
export class HelloWorldService {

    constructor(private http: HttpClient) { }

    getWelcome(): Observable<string> {
        return this.http.get<string>("/api/helloWorld");
    }
}

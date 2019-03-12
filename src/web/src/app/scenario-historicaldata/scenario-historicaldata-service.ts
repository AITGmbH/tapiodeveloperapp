import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Provides access to the tapio subscriptions.
 */
@Injectable({ providedIn: 'root' })
export class HistoricalDataService {

    constructor(private http: HttpClient) { }
}

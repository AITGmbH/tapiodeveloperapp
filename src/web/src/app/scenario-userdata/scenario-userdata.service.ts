import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScenarioUserdataService {

  constructor(private readonly http: HttpClient) { }

  public getClientId(): Observable<string> {
    return this.http.get<string>('/api/userdata/clientId');
  }
}

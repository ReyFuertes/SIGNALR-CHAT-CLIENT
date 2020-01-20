import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient) {
      this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('token') || null) ?
      JSON.parse(localStorage.getItem('token')).token : null;
  }

  protected commonHeaders(isUpdate: boolean = false): HttpHeaders {
    const contentType = isUpdate ? 'application/json-patch+json' : 'application/json';
    return new HttpHeaders({
      'Content-Type': contentType,
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  public post(object?: T, url?: string): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, object, { headers: this.commonHeaders() });
  }

}

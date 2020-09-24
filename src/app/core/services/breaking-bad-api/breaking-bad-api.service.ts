import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Characters } from '@core/interfaces/breaking-bad-api/characters';
import { Observable } from '@node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakingBadApiService {
  private url = 'https://www.breakingbadapi.com/api/';
  private characters = 'characters';

  constructor(
    private http: HttpClient
  ) {
  }

  public fetchAllCharacters(): Observable<Characters[]> {
    return this.http.get<Characters[]>(`${this.url}${this.characters}`);
  }
}

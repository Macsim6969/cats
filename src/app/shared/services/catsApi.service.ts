import { environment } from './../../../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { expand, forkJoin, map, Observable, of, reduce, switchMap } from "rxjs";
import { Cats } from '../models/cats.interface';
import { Breeds } from '../models/breeds.interface';


@Injectable()

export class CatsApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Отримання порід
  public getBreeds(): Observable<Breeds[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    return this.http.get<Breeds[]>(`${environment.API_URL}/breeds`, { headers });
  }

  // Отримання котів за породою та кількістю
  public getCatsByBreed(breedId: string, limit: number): Observable<Cats[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    const params = new HttpParams()
      .set('breed_id', breedId)
      .set('limit', limit.toString());

    return this.http.get<Cats[]>(`${environment.API_URL}/images/search`, { headers, params });
  }

  public getAllCats(limit: number = 10): Observable<Cats[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    const params = new HttpParams()
      .set('limit', limit);

    return this.http.get<Cats[]>(`${environment.API_URL}/images/search`, { headers, params });

  }

}
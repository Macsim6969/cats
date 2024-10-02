import { environment } from './../../../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()

export class CatsApiService {


  constructor(
    private http: HttpClient
  ) { }


  public getBreeds(): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    return this.http.get(`${environment.API_URL}/breeds`, { headers });
  }


  public getCatsByBreed(breedId: string, limit: number = 10): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    const params = new HttpParams()
      .set('breed_id', breedId)
      .set('limit', limit.toString());

    return this.http.get(`${environment.API_URL}/images/search`, { headers, params });
  }
}
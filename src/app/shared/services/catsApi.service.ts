import { environment } from './../../../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, from, map, mergeMap, Observable, of, switchMap, throwError, toArray } from "rxjs";
import { Cats } from '../models/cats.interface';
import { Breeds } from '../models/breeds.interface';
import { Store } from '@ngxs/store';
import { CatsState } from '../../store/state/cats.state';
import { CatsService } from './cats.service';


@Injectable()

export class CatsApiService {

  constructor(
    private http: HttpClient,
    private store: Store,
    private catsService: CatsService
  ) { }

  // Obtaining rocks
  public getBreeds(): Observable<Breeds[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    return this.http.get<Breeds[]>(`${environment.API_URL}/breeds`, { headers }).pipe(
      catchError(err => {
        if (err.status === 429) {
          this.catsService._errorData = 'Exceeding the query limit, skipping the rock:';
          return of([]);
        }
        return throwError(err);
      })
    );
  }

  public getCatsByBreed(breedId: string, limit: number): Observable<Cats[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    const params = new HttpParams()
      .set('breed_id', breedId)
      .set('limit', limit.toString());

    return this.http.get<Cats[]>(`${environment.API_URL}/images/search`, { headers, params });
  }


  public getAllCatsByBreeds(limit?: number, maxConcurrentRequests: number = 4): Observable<Cats[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });

    return this.store.select(CatsState.breeds).pipe(
      switchMap((breeds: Breeds[]) => {
        return from(breeds).pipe(
          mergeMap((breed: Breeds, index: number) => {
            const params = new HttpParams()
              .set('breed_id', breed.id)
              .set('limit', limit ? limit : 10); // Increase the limit to collect more pictures.

            return this.http.get<Cats[]>(`${environment.API_URL}/images/search`, { headers, params }).pipe(
              catchError(err => {
                if (err.status === 429) {
                  this.catsService._errorData = 'Exceeding the query limit, skipping the rock:';
                  return of([]); // Return empty array in case of error 429
                }
                return throwError(err);
              })
            );
          }, maxConcurrentRequests),
          toArray(),
          map((allCatsByBreeds: Cats[][]) => allCatsByBreeds.flat())
        );
      })
    )
  }
}
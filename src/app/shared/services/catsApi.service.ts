import { environment } from './../../../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap,  from, map, mergeMap, Observable, switchMap, toArray } from "rxjs";
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

  // public getAllCatsByBreeds(limit: number = 10): Observable<Cats[]> {
  //   const headers = new HttpHeaders({
  //     'x-api-key': environment.API_KEY
  //   });
  
  //   // Сначала получаем все породы
  //   return this.getBreeds().pipe(
  //     switchMap((breeds: Breeds[]) => {
  //       return from(breeds).pipe(  // Превращаем список пород в поток
  //         concatMap((breed: Breeds) => {
  //           console.log(breed);
  //           const params = new HttpParams()
  //             .set('breed_id', breed.id)
  //             .set('limit', limit.toString());
  
  //           // Запрос для получения котов по каждой породе последовательно
  //           return this.http.get<Cats[]>(`${environment.API_URL}/images/search`, { headers, params });
  //         }),
  //         toArray(), // Собираем результаты всех запросов в массив
  //         map((allCatsByBreeds: Cats[][]) => allCatsByBreeds.flat()) // Объединяем массивы котов в один
  //       );
  //     })
  //   );
  // }

  public getAllCatsByBreeds(limit: number = 10, maxConcurrentRequests: number = 5): Observable<Cats[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY
    });
  
    // Сначала получаем все породы
    return this.getBreeds().pipe(
      switchMap((breeds: Breeds[]) => {
        return from(breeds).pipe(  // Превращаем массив пород в поток
          mergeMap((breed: Breeds) => {
            const params = new HttpParams()
              .set('breed_id', breed.id)
              .set('limit', limit.toString());
  
            // Запрос для получения котов по каждой породе
            return this.http.get<Cats[]>(`${environment.API_URL}/images/search`, { headers, params });
          }, maxConcurrentRequests),  // Устанавливаем количество одновременных запросов
          toArray(), // Собираем результаты всех запросов в массив
          map((allCatsByBreeds: Cats[][]) => allCatsByBreeds.flat()) // Объединяем массивы котов в один
        );
      })
    );
  }

}
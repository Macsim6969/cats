import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class CatsService {

  private errorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  set _errorData(value: string | null) {
    console.log(value);
    this.errorSubject.next(value);
  }

  get _errorData$() {
    return this.errorSubject;
  }
}
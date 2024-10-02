export class LoadBreeds {
  static readonly type = '[Cats] Load Breeds';
}

export class SearchCats {
  constructor(public breedId: string, public limit: number) { }
  static readonly type = '[Cats] Search Cats';
}

export class GetAllCats {
  constructor(public limit: number) { }
  static readonly type = '[Cats] Load All';
}
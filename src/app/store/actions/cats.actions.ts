export class LoadBreeds {
  static readonly type = '[Cats] Load Breeds';
}

export class UpdatedBreedIdAndLimit {
  constructor(public breedId: string, public limit: number) { }
  static readonly type = '[Cats] Update BreedId And Limit';
}

export class GetAllCats {
  constructor(public limit: number) { }
  static readonly type = '[Cats] Load All';
}

export class GetCatsByBreed {
  constructor(public breedId: string, public limit: number) { }
  static readonly type = '[Cats] Load Cats By Breed';
}
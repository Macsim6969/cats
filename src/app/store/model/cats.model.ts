import { Breeds } from "../../shared/models/breeds.interface";
import { Cats } from "../../shared/models/cats.interface";


export interface CatsStateModel {
  breeds: Breeds[];
  cats: Cats[];
}
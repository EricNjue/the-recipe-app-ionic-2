
import {Injectable} from "@angular/core";
import {IngredientModel} from "../models/ingredient";

@Injectable()
export class ShoppingListService {

  private ingredients: IngredientModel[] = [];

  addItem(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
  }

  addItems(items: IngredientModel[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index:number) {
    this.ingredients.splice(index, 1);
  }
}

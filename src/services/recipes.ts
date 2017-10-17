
import {Injectable} from "@angular/core";
import {RecipeModel} from "../models/recipe";

@Injectable()
export class RecipesService {

  private recipes: RecipeModel[] = [];

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    console.log(this.recipes);
  }

  getRecipe() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, recipe: RecipeModel) {
    this.recipes[index] = recipe;
  }

  removeRecipe(index: number) {
    this.recipes.splice(index,1);
  }
}

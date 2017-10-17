import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipesService} from "../../services/recipes";
import {RecipeModel} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: RecipeModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: RecipeModel, index: number) {
      this.navCtrl.push(RecipePage,{recipe: recipe, index: index});
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipe();
  }
}

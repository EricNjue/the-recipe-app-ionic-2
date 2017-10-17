import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes";
import {RecipeModel} from "../../models/recipe";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = "New"; // default is new
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: RecipeModel;
  index: number;

  constructor(private navParams: NavParams, private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController, private toastCtrl: ToastController,
              private recipesServce: RecipesService, private navCtrl: NavController) {

  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () =>{
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
              const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
              const len = fArray.length;
              if(len>0) {
                for (let i = len - 1; i>=0; i--) {
                    fArray.removeAt(i);
                }

                const  toast = this.toastCtrl.create({
                  message: 'All ingredients removed',
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present();
              }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null){
                // show a toast
              const  toast = this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const  toast = this.toastCtrl.create({
              message: 'Item added',
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }
        }
      ]
    });

    return newIngredientAlert;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit') {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  // reactive way of generating forms
  private initializeForm() {

    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;

      for(let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title' : new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length> 0) {
      ingredients = value.ingredients.map(name =>{
        return {name: name, amount:1};
      });
    }

    if(this.mode == 'Edit') {
      this.recipesServce.updateRecipe(this.index, new RecipeModel(value.title, value.description, value.difficulty,
        ingredients));
    }else {
      this.recipesServce.addRecipe(new RecipeModel(value.title, value.description, value.difficulty, ingredients));
    }

    // this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }


}

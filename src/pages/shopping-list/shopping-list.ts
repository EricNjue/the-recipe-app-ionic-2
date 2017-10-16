import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {IngredientModel} from "../../models/ingredient";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: IngredientModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private shpListService: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shpListService.addItem(new IngredientModel(form.value.ingredientName,form.value.ingredientAmount));
    form.reset();
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shpListService.getItems();
  }

  onDeleteItem(index: number) {
    this.shpListService.removeItem(index);
    this.loadItems();
  }
}

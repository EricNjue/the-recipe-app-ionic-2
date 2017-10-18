import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {IngredientModel} from "../../models/ingredient";
import {SlOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: IngredientModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private shpListService: ShoppingListService, private popoverCtrl: PopoverController,
              private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController)
  {
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev : event });
    popover.onDidDismiss(data =>{
        if(data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then((token: string)=>{
              this.shpListService.fetchList(token)
                .subscribe((list: IngredientModel[]) => {

                    if(list) {
                      this.listItems = list;
                    } else {
                       this.listItems = [];
                    }
                  loading.dismiss();
                }, error=>
                {
                  loading.dismiss();
                  console.log(error);
                  this.handleError(error.message);
                });
            });
        } else if (data.action == 'store'){
          loading.present();
            this.authService.getActiveUser().getToken()
              .then((token: string)=>{
                  this.shpListService.storeList(token)
                    .subscribe(data => {
                      loading.dismiss();
                      console.log('Success');
                    }, error=>
                    {
                      console.log(error);
                      loading.dismiss();
                      this.handleError(error.message);
                    });
              });
        }else {

        }
    });
  }

  private handleError(error: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!!',
      message: error,
      buttons: ['Ok']
    });
    alert.present();
  }
}

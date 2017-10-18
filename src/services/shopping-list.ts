
import {Injectable} from "@angular/core";
import {IngredientModel} from "../models/ingredient";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import  'rxjs/Rx';

@Injectable()
export class ShoppingListService {

  constructor(private http: Http, private authService: AuthService) {

  }

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

  storeList(token: string) {
    const userID =this.authService.getActiveUser().uid;
    return this.http
     .put('https://firestore-84a3f.firebaseio.com/' + userID + '/shopping-list.json?auth=' + token,this.ingredients)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userID =this.authService.getActiveUser().uid;
    return this.http.get('https://firestore-84a3f.firebaseio.com/' + userID + '/shopping-list.json?auth=' + token)
      .map((response: Response) =>{
        return response.json();
      })
      .do((data) =>{
        this.ingredients = data;
      });
  }

}

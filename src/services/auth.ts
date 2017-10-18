import {Injectable} from "@angular/core";
import firebase from 'firebase';

@Injectable()
export class AuthService {

  signUp(email: string, password: string) {
   return firebase.auth().createUserWithEmailAndPassword(email,password);
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }
}

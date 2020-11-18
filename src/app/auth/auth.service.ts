import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";

//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/switchMap';

import {AngularUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //localUser: Observable<AngularUser>; this.localUser =

  constructor(
    private  afAuth:  AngularFireAuth,
    //private afs: AngularFirestore,
    private  router:  Router) {
          /*   this.afAuth.authState.subscribe(user => {
          if (user){
            localStorage.setItem('user', JSON.stringify(user));

            return this.afs.doc<AngularUser>(`users/${user.uid}/profile/Detail`).valueChanges();
          } else {
            localStorage.setItem('user', null);
            return Observable.of(null);
          }
        }); */
  }

  async login(email: string, password: string) {
    try {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log("in login, ", result);
      // send user info to the Db for login update here
      this.router.navigate(['/process/processing']);
    } catch {error => {
        console.log("error during login ", error);
    }};
}

  async register(email: string, password: string) {
      var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    //  this.sendEmailVerification(); leave it to the server
  }
/*
  async sendEmailVerification() {
      await this.afAuth.currentUser.sendEmailVerification();
      this.router.navigate(['admin/verify-email']);
  }
*/
  async sendPasswordResetEmail(passwordResetEmail: string) {
   return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    }

    get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
    }

    async  loginWithGoogle(){
      const provider = new auth.GoogleAuthProvider();
     try {
       let result = await  this.oAuthLogin(provider);
       console.log("googleLogin: ", result);
       // send info about login to the server for db update
     } catch{
       (error) => {console.log("googleLogin error: ", error)}
     };

     this.router.navigate(['processing']);
    }

    private oAuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider);
    }

}

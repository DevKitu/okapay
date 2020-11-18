import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(public  router:  Router) { }

  handleError(error: any) {

    //navigate to the error component
    //this.router.navigate(['/error']);
  }
}

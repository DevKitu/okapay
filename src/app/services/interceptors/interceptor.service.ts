import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  handleError(error: HttpErrorResponse){
    //const router = this.injector.get(Router);
   //navigate to the error component
     console.log("http error: ", error);
    // router.navigate(['/signup']);

   return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
    return next.handle(req)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  };
}

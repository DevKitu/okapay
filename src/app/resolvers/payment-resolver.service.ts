import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {Observable } from 'rxjs'
import { APIService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentResolverService implements Resolve <any>{

  constructor( private apiService: APIService) { }

  resolve () : Observable<any> {
    return this.apiService.apiGetProcessData();
  }
}

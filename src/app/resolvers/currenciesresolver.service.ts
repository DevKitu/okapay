import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {Observable } from 'rxjs'
import { APIService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesresolverService implements Resolve <any> {

  currencies:any;
  constructor( private apiService: APIService) { }

  resolve () : Observable<any> {
    return this.apiService.apiGetExchangeRate();
  }

}

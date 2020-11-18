import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIService } from '../services/api.service';
import {Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class ResolversService implements Resolve <any> {

  currencies:any;
  constructor(private api:APIService, private http: HttpClient,) { }

  resolve () : Observable<any> {
    return this.http.get ('https://api.exchangeratesapi.io/latest');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  currencies;
  constructor( private http: HttpClient, private apiService:APIService ) { }

  Init() {

       return new Promise<void>((resolve, reject) => {
           console.log("AppInitService.init() called");
           ////do your initialisation stuff here
           setTimeout(() => {
               console.log('AppInitService Finished');
               resolve();
           }, 200);

       });
   }

  async getUserLocation() {

    // Get the IP Location of the user
    let ip_api_key = environment.ipFy.apiKey;
    let ip_api_url = 'https://geo.ipify.org/api/v1?';
    let ip_url = ip_api_url + 'apiKey='+ ip_api_key;
    // check if there is already a location store in local storage, if there is take it
    let userIP = localStorage.getItem('userIP') ? JSON.parse(localStorage.getItem('userIP')): null;
    // if there is an user location, do not call the API, use the local location, if there is nothing, call API
    if(userIP){
        console.log('there is a userIp in localStorage: ',userIP);
        this.apiService.apiPostUserIP(userIP);
    } else {
      try {
         userIP = await this.http.get (ip_url).toPromise();
         this.apiService.apiPostUserIP(userIP);
         console.log('user does not exist in storage:',userIP);
         localStorage.setItem('userIP', JSON.stringify(userIP));
      } catch(error){
        return error;//{error:error, description:'error from the get IP API, could not get the user IP'};
      }
    }

    // Get the country details of the user, api URL
    let co_api_url = 'https://restcountries.eu/rest/v2/alpha?codes=';
    // Get the country code from the userIP data
    let userCountryCode = userIP.location.country;
    // request both the destination country which always CD for now and send country which is the user location country
    let co_url = co_api_url + userCountryCode +';cd';
    // check if there is already a location store in local storage, if there is take it
    let countries = localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries')): null;

    // need to add a try and catch to get error for error handling
    // if there is an user location, do not call the API, use the local location, if there is nothing, call API
    if(countries){
        console.log('there is a countries in localStorage: ',countries);
        this.apiService.apiPostCountries(countries);
    } else {
      try {
         countries = await this.http.get (co_url).toPromise();
         this.apiService.apiPostCountries(countries);
         console.log('user does not exist in storage:',countries);
         localStorage.setItem('countries', JSON.stringify(countries));
      } catch(error){
          return error;//{error:error, description:'error from the get Country details API, could not get the user country info'};
      }

    }



    // Get the currencies details of the user
    let cu_api_url = 'https://api.exchangeratesapi.io/latest?base=';
    let sendCountryCode = await countries[0].currencies[0].code;
    // request both the destination country which always CD for now and send country.
    let cu_url = cu_api_url + sendCountryCode ;
    // check if there is already a location store in local storage, if there is take it
    let exchangeRate= localStorage.getItem('exchangeRate') ? JSON.parse(localStorage.getItem('exchangeRate')): null;
    // check the date for comparaison for the exchange rate
    const dateNow = new Date().toISOString().split('T')[0]; //new Date().toISOString().split('T')[0] or new Date().toISOString().slice(0, 10)
    console.log('time now is ', dateNow);
    // if there is an user location, do not call the API, use the local location, if there is nothing, call API
    if(exchangeRate && (dateNow === exchangeRate.date)){

        console.log("I have the same exact date");
        console.log('there is a exchangeRate in localStorage: ',exchangeRate);
        console.log('the exchangeRate date in localStorage: ',exchangeRate.date);
        this.apiService.apiPostExchangeRate(exchangeRate);
        return countries;

    } else {
        try {
          exchangeRate = await this.http.get (cu_url).toPromise();
          this.apiService.apiPostExchangeRate(exchangeRate);
          console.log('user does not exist in storage:',exchangeRate);
          localStorage.setItem('exchangeRate', JSON.stringify(exchangeRate));
          return countries;
        } catch(error){
          return error;//{error:error, description:'error from the get Exchange Rate API, could not get the exchange rate info'};
        }
  }
  }
}

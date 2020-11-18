import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AngularFireFunctions } from "@angular/fire/functions";

import { environment } from '../../environments/environment';

import { Location } from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  userCountry:any;
  countries:any;
  destinationCountry:any;
  exchangeRate:any;
  userIP:any;
  homeData:any;
  processData:any;
  /*
  httpOptions = {
  headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods':'Access-Control-Allow-Methods", "GET, POST,PATCH, PUT, DELETE, OPTIONS'
    })
  };*/
  constructor(
    private http: HttpClient,
    private router: Router,
    private firebaseFunctions: AngularFireFunctions
    ) { }

  apiPostExchangeRate(exch:any) {
    console.log('exch ',exch);
    this.exchangeRate = exch;
    }
  apiGetExchangeRate() {
    return this.exchangeRate ;
    }

  apiPostUserIP(ip:any)
  {
    console.log('ip ',ip);
    this.userIP = ip;
  }
  apiGetUserCountryCode() {
    return this.userIP.location;
  }

  apiPostCountries(countries:any) {
    console.log('countries ',countries);
    this.countries = countries;
 }
 apiGetCountries() {
   return this.countries ;
 }

 apiGetUserCountry() {
   return this.countries[0] ;
 }

apiGetDestinationCountry() {
  return this.countries[1] ;
}

apiPostHomeData(data:any){
  this.homeData = data;
}

apiGetHomeData(){
  return this.homeData;
}

apiPostProcessData(data:any){
  this.processData = data;
}

apiGetProcessData(){
  return this.processData;
}
/*
apiGetDateandTime(){

  const dateFormat = 'YYYY-MM-DD';
  let serverDate;

  var getDate = this.firebaseFunctions.functions().httpsCallable('localDate');

  getDate({format: dateFormat}).then(function(result) {
    // Read result of the Cloud Function.
      serverDate = result.data;
  }).catch(function(error) {
    // Getting the Error details.
    var code = error.code;
    var message = error.message;
    var details = error.details;
    // error received
    console.log('error: ',code, message, details);

  });

  console.log('received Date from server: ', serverDate);

}
*/
 async apiPostMessage(){

    const messageContent = {
    phoneNumber: '+17096312521',
    message: 'Hello from the Annick using Twilio and Firebase cloud functions'
    };
    const sms_url = 'https://us-central1-report-9990d.cloudfunctions.net/localAPI/api/sendmessage';
    console.log("before sms http post in client: ");
    try {
      console.log("start sms http post in client: ");
      const sendSMSResult = await this.http.post (sms_url, messageContent).toPromise();
      console.log("after sms http post in client: ");
        const result = await sendSMSResult;
          console.log("we received sms from function: ", result);
      }
      catch(error){
        console.log("after sms http post in client error: ");
            console.log("we received an error when attempting to send SMS: ", error);
      }


}

async payment(){
  const paymentContent = {
  price: 85,
  uid: 'rf2344kiowall234f344'
  };
  const payment_url = 'https://us-central1-report-9990d.cloudfunctions.net/localAPI/api/payment';
  console.log("before payment http post in client: ");
  try {
    console.log("start payment http post in client: ");
    const sendPaymentResult = await this.http.post (payment_url, paymentContent /*, this.httpOptions*/).toPromise();
    console.log("after payment http post in client: ");
      const result = await sendPaymentResult;
        console.log("we received payment result from function: ", result.approval_url);
        //const url = '/'+result.approval_url;
        //this.router.navigateByUrl(url);
        window.location.href = result.approval_url;

    }
    catch(error){
      console.log("after payment http post in client error: ");
          console.log("we received an error when attempting to send payment: ", error);
    }

}

async executePayment (payment:any, payer:any){


  const executeContent = {
  paymentId: '',
  payerID: ''
};
executeContent.paymentId = payment;
executeContent.payerID = payer;
console.log('execute payment content: ', executeContent);

  try {
    console.log("start execute http post in client: ");
    const sendExecuteResult = await this.http.post ('https://us-central1-report-9990d.cloudfunctions.net/localAPI/api/payment/execute', executeContent).toPromise();
    console.log("after execute http post in client: ");
    const result = await sendExecuteResult;
    console.log("we received execute result from function: ", result);
        //const url = '/'+result.approval_url;
        //this.router.navigateByUrl(url);
        //window.location.href = result.approval_url;

    }
    catch(error){
      console.log("we received an error when attempting to execute: ", error);
    }


  //  const payment_url = ;


}

getFees(){
    const fees = [
      {
        "amountToCharge":50.0,
        "currency":"CAD",
        "feesToCharge":4.99
      },
      {
        "amountToCharge":75.0,
        "currency":"CAD",
        "feesToCharge":5.99
      },
      {
        "amountToCharge":100.0,
        "currency":"CAD",
        "feesToCharge":6.99
      },
      {
        "amountToCharge":150.0,
        "currency":"CAD",
        "feesToCharge":7.59
      },
      {
        "amountToCharge":200.0,
        "currency":"CAD",
        "feesToCharge":7.99
      },
      {
        "amountToCharge":250.0,
        "currency":"CAD",
        "feesToCharge":8.59
      },
      {
        "amountToCharge":300.0,
        "currency":"CAD",
        "feesToCharge":9.99
      },
      {
        "amountToCharge":400.0,
        "currency":"CAD",
        "feesToCharge":13.99
      },
      {
        "amountToCharge":500.0,
        "currency":"CAD",
        "feesToCharge":15.99
      },
      {
        "amountToCharge":600.0,
        "currency":"CAD",
        "feesToCharge":17.99
      },
      {
        "amountToCharge":800.0,
        "currency":"CAD",
        "feesToCharge":24.99
      },
      {
        "amountToCharge":1000.0,
        "currency":"CAD",
        "feesToCharge":30.99
      },
      {
        "amountToCharge":1200.0,
        "currency":"CAD",
        "feesToCharge":34.99
      },
      {
        "amountToCharge":1450.0,
        "currency":"CAD",
        "feesToCharge":37.99
      }
    ];
    return fees;
 }
}

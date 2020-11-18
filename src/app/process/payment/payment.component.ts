import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild('paypal', {static: true }) paypalElement: ElementRef;

  products = [
    {
      price:8.7,
      description: 'amount to be send to Congo'
    },
    {
      price:8.7,
      description: 'amount to be send to Congo 2 '
    },
    {
      price:8.7,
      description: 'amount to be send to Congo 3 '
    }

  ];
  paidFor = false;
  apiData;
  paymentId;
  token;
  payerID;


  constructor(
    private activatedRoute:ActivatedRoute,
    public appAPI:APIService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {
      this.apiData = data;
      console.log("payment api data ", data);
    });
/*
    this.activatedRoute.paramMap.subscribe(params => {
        this.paymentId = params.get('paymentId');
        this.token = params.get('token');
        this.payerID = params.get('PayerID');
      });
*/
      this.paymentId = this.getURLParameter('paymentId');
      this.token = this.getURLParameter('token');
      this.payerID = this.getURLParameter('PayerID');

      console.log("href api data ", this.paymentId,this.token,this.payerID);

/*
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.products[0].price
                }
              }
            ]
          });

        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log("onApproved: ",order);
        },
        onError: err => {
          console.log("error: ",err);
        }
      })
      .render(this.paypalElement.nativeElement);
      */
  }

  proceedWithPayment() {
      this.appAPI.executePayment(this.paymentId, this.payerID);
      console.log("params: ", this.paymentId,this.token,this.payerID);
  }

  getURLParameter(parameter) {
       var url;
       var search;
       var parsed;
       var count;
       var loop;
       var searchPhrase;
       url = window.location.href;
       console.log('url returned: ', url);
       search = url.indexOf("?");
       if (search < 0) {
           return "";
       }
       searchPhrase = parameter + "=";
       parsed = url.substr(search+1).split("&");
       count = parsed.length;
       for(loop=0;loop<count;loop++) {
           if (parsed[loop].substr(0,searchPhrase.length)==searchPhrase) {
               return decodeURI(parsed[loop].substr(searchPhrase.length));
           }
       }
       return "";
   }
}

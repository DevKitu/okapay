import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormGroup,FormGroupDirective,FormBuilder, FormControl, Validators, NG_ASYNC_VALIDATORS, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeData } from './form.model';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  factor: number = 1.5;

  homeForm: FormGroup;
  options= {
    one:"M-pesa",
    two:"Orange-Money",
    three:"Airtel-Money"
  };
  rates= {
    cad: 12,
    zar: 12,
    usd:32
  };
  currencies;
  currency;
  apiData:any;
  sendFlag:string;
  recFlag:string;
  rate:number;
  totalToPay:number;
  feePayed:any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    public appAPI:APIService,
    private router: Router
  ) {
    this.sendFlag="";
    this.recFlag="";
    this.homeForm = this.fb.group({
        send: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        received: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        sendOption: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        totalFees: new FormControl(null, {

        }),
        totalPay: new FormControl(null, {

        }),
        currency: new FormControl(null, {

        }),
        rate: new FormControl(null, {

        }),
      });
   }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {
      this.apiData = data;
    });
  //  const foo = this.activatedRoute.snapshot.data['currencies'];
    this.sendFlag = this.apiData.locations[0].flag;
    this.recFlag = this.apiData.locations[1].flag;
    this.rates = this.apiData.currencies.rates;
    this.currencies= Object.keys(this.rates);
    this.currency = this.apiData.currencies.base;
    this.rate = this.apiData.currencies.rates.USD;
    console.log("test output ", this.rate);
    this.feePayed=0;
    this.totalToPay=0;

  }


  onSendChange() {

    let amountToSend = this.homeForm.controls.send.value;
    const fees = this.appAPI.getFees();
    const receivedAmount = amountToSend * this.rate;

    this.feePayed = 0.03 * amountToSend;

    for (const fee of fees) {
            if (fee.amountToCharge >= amountToSend) {
                this.feePayed = fee.feesToCharge;
                break;
            }
        }
    this.totalToPay = ((receivedAmount / this.rate) + this.feePayed);


        this.homeForm.patchValue({
            received: receivedAmount,
            totalFees: this.feePayed,
            totalPay: this.totalToPay,
            currency: this.currency,
            rate: this.rate
            });

    }
  onReceivedChange() {

    let amountToReceive = this.homeForm.controls.received.value;
    const fees = this.appAPI.getFees();
    const sendAmount = amountToReceive / this.rate;

    this.feePayed = 0.03 * amountToReceive;

    this.homeForm.patchValue({
            send:   sendAmount,
            totalFees: this.feePayed,
            totalPay: this.totalToPay,
            currency: this.currency,
            rate: this.rate
    });

    for (const fee of fees) {
                if (fee.amountToCharge >= sendAmount) {
                    this.feePayed = fee.feesToCharge;
                    break;
                }
            }
    this.totalToPay = ((sendAmount ) + this.feePayed);
  }

  onSubmitForm() {
    if (this.homeForm.invalid) {
      console.log('Invalid create req');
      return ;
    }
    this.isLoading = true;
    console.log("now: ", this.homeForm.value);
    this.appAPI.apiPostHomeData(this.homeForm.value);
    localStorage.setItem('transferHomeData', JSON.stringify(this.homeForm.value));
    //this.appAPI.apiPostMessage();
    this.router.navigate(['/login']);
  }

  testFunction(){
    console.log('we are calling the payment now ...');
    this.appAPI.payment();
  }

}

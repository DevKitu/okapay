import { Component, OnInit } from '@angular/core';

import { FormGroup,FormGroupDirective,FormBuilder, FormControl, Validators, NG_ASYNC_VALIDATORS, NgForm } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {

  processForm: FormGroup;
  isLoading:boolean;
  code='243';
  apiData:any;
  country;
  reason;
  countries= [
    {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
      },
      {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
      },
      {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
      },
      {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
      },
      {
      "name": "Congo, The Democratic Republic of the Congo",
      "dial_code": "+243",
      "code": "CD"
      },
    ];
  reasons= [
    {
    "name": "Gift to family",
    },
    {
    "name": "Business Payment",
    },
    {
    "name": "Charity",
    }
    ];
  constructor(
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    public appAPI:APIService,
    private router: Router
  ) {
    this.processForm = this.fb.group({
        name: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        lastName: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        phone: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        email: new FormControl(null, {

        }),
        country: new FormControl(null, {

        }),
        reason: new FormControl(null, {

        })
      });
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {
      this.apiData = data;
    });

    this.country = this.countries[0].name;
    this.reason = this.reasons[0].name;

    console.log("process api data: ", this.apiData);

//    console.log("paypal payment ID: ", this.activatedRoute.snapshot.paramMap);
//    console.log("paypal payment token: ", this.activatedRoute.snapshot.queryParamMap.paramMap.get("token"));
//    console.log("paypal payment payer id: ", this.activatedRoute.snapshot.queryParamMap.paramMap.get("PayerID"));

  }
  countrySelected(e:any){

    for (const country of this.countries) {
            if (country.name === e.value) {
                this.code = country.dial_code;
                break;
            }
        }

  }
  onSubmitForm() {
    if (this.processForm.invalid) {
      console.log('Invalid create req');
      return ;
    }
    this.isLoading = true;
    console.log("now: ", this.processForm.value);
    this.appAPI.apiPostProcessData(this.processForm.value);
    this.appAPI.payment();
    // this.router.navigate(['/process/payment']);
  }

}

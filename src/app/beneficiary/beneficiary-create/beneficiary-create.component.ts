import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NG_ASYNC_VALIDATORS, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { BeneficiaryService } from '../service/beneficiary.service';
import { Beneficiary } from '../model/beneficiary.model';

@Component({
  selector: 'app-beneficiary-create',
  templateUrl: './beneficiary-create.component.html',
  styleUrls: ['./beneficiary-create.component.css']
})
export class BeneficiaryCreateComponent implements OnInit {

  public beneficiary: Beneficiary;
  public mode = 'create';
  private beneficiaryID: string ;
  isLoading = false;
  form: FormGroup;
  private count = 0;


  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    public beneficiaryService: BeneficiaryService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2), Validators.email]
      }),
      country: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      reason: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      })
  });
  }

  onSaveBeneficiary() {
     if (this.form.invalid) {
       console.log('Invalid form while create beneficiary', this.beneficiary);
       return ;
     }
     this.isLoading = true;
     if (this.mode === 'create') {

       this.beneficiary = {
         date: new Date,
         name: this.form.value.name,
         lastName: this.form.value.lastName,
         email: this.form.value.email,
         country: this.form.value.country,
         reason: this.form.value.reason,
         phone: this.form.value.phoneNumber
       };
      // this.beneficiaryService.addBeneficiary(this.beneficiary);
       // console.log('Sending create req', this.harvester);
     } else if (this.mode === 'edit') {

       this.beneficiary = {
         date: new Date,
         name: this.form.value.name,
         lastName: this.form.value.lastName,
         email: this.form.value.email,
         country: this.form.value.country,
         reason: this.form.value.reason,
         phone: this.form.value.phoneNumber
       };
      //  this.studentsService.updateStudent(this.student);
      // console.log('Sending update req for ', this.student);
     }

    // this.form.reset();
     this.formDirective.resetForm();

   }


}

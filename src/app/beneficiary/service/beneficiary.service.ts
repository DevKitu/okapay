import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Beneficiary } from '../model/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  private beneficiary: Beneficiary[] = [];
  private beneficiariesUpdated = new Subject<Beneficiary []>();
  private lList = [
    {
      name: 'Beneficiary Registration',
      description: 'To register as an Beneficiary, click here',
      link: '/beneficiaryCreate'
    },
    {
      name: 'List of Beneficiary',
      description: 'To see the list of all Beneficiary click here (only admin or employees can see)',
      link: '/beneficiaryList'
    },
    {
      name: 'Login',
      description: 'To login, click here',
      link: '/login'
    },
  ];
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
/*
  getLookups() {
  return this.lList;
  }

  getBeneficiaries() {

   this.getFees <Beneficiary[]> ()
       .subscribe((beneficiaryData ) => {
         this.beneficiary = beneficiaryData;
         this.beneficiariesUpdated.next([...this.beneficiary]);

       });
  }

  getBeneficiaryUpdateListener() {
   return this.beneficiariesUpdated.asObservable();
  }

  addBeneficiary(newBeneficiary: Beneficiary) {

    this.beneficiary.push(newBeneficiary);
    this.beneficiariesUpdated.next([...this.beneficiary]);

  }

  getFees(){
      const fees:Array<Beneficiary> = [
        {
          'date': new Date,
          'name': 'sender name',
          'lastName': 'sender last name',
          'email': 'datasend@gmail.com',
          'country': 'Canada',
          'reason': 'gift data',
          'phone': '+1 709 233 2155'
        },
        {
          'date': new Date,
          'name': 'sender name',
          'lastName': 'sender last name',
          'email': 'datasend@gmail.com',
          'country': 'Canada',
          'reason': 'gift data',
          'phone': '+1 709 233 2155'
        },
        {
          'date': new Date,
          'name': 'sender name',
          'lastName': 'sender last name',
          'email': 'datasend@gmail.com',
          'country': 'Canada',
          'reason': 'gift data',
          'phone': '+1 709 233 2155'
        }
      ];

      return fees;
    }
    */
}

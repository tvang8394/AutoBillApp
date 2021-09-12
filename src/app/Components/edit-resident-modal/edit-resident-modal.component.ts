import { Component, OnInit } from '@angular/core';
import { ResidentService } from 'src/app/Services/residents.service';
import { BillingService } from 'src/app/Services/billing.service';
import { Resident } from '../../Interface/resident'
import { Billing } from '../../Interface/billing'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-edit-resident-modal',
  templateUrl: './edit-resident-modal.component.html',
  styleUrls: ['./edit-resident-modal.component.scss']
})
export class EditResidentModalComponent implements OnInit {

  validatingForm: FormGroup;

  id: number;
  title: string;
  first_name: string;
  start_date: string;
  end_date: string;
  amount: string;
  cash_rec: string;
  units: string;

  constructor(public modalRef: MdbModalRef<EditResidentModalComponent>, private residentService: ResidentService, private router: Router, private billingService: BillingService) {

  }

  resident: Resident;

  ngOnInit() {
    
    this.getResident();
  }

  getResident(): void {
    let url = this.router.url;
    let id = url.substring(url.lastIndexOf('/') + 1);
    this.residentService.getResident(parseInt(id)).subscribe(
      resident => {
        this.resident = resident;
      },
      error => console.log(error)
    );

    // this.residentService.getResident(
  }


  deleteBtn(): void {
    let check = false;

    if (confirm('Are you sure you want to delete this Billing?')) {
      check = true;
    }
    if (check) {

      this.billingService.deleteBilling(this.id).subscribe(
        success => {
          this.modalRef.close();
          window.location.reload();
        }
      );
    }
  }

 
  add(first_name: string, last_name: string, dob: string, subId: string, diagnosisCode: string, umpi: string, mainModifier: string, modifier: string, amount: string, priorAuth: string): void {
    first_name = first_name.trim();
    if (!first_name) { return; }
    console.log(first_name);

    this.resident.first_name = first_name;
    this.resident.last_name = last_name;
    this.resident.date_of_birth = dob;
    this.resident.subId = subId;
    this.resident.diagnosisCode = diagnosisCode;
    this.resident.umpi = umpi;
    this.resident.main_modifier = mainModifier;
    this.resident.sub_modifier = modifier;
    this.resident.amount = amount;
    this.resident.prior_auth = priorAuth;

    
    this.residentService.updateResident(this.resident).subscribe(
      (res) => {
        window.location.reload();
      }
    );

    // first_name = '';
    // last_name = '';
    // dob = '';
    // subId = '';
    // diagnosisCode = '';
    // umpi = '';
    // mainModifier = '';
    // modifier = '';
    // amount = '';
    // priorAuth = '';

  }
}

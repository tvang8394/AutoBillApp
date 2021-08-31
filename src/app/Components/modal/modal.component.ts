import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Billing } from 'src/app/Interface/billing';
import { Resident } from 'src/app/Interface/resident';
import { ResidentService } from 'src/app/Services/residents.service';
import { Router } from '@angular/router';
import { BillingService } from 'src/app/Services/billing.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  validatingForm: FormGroup;

  id: number;
  title: string;
  first_name: string;
  start_date: string;
  end_date: string;
  amount: string;
  cash_rec: string;
  units: string;

  constructor(public modalRef: MdbModalRef<ModalComponent>, private residentService: ResidentService, private router: Router, private billingService: BillingService) {

  }

  resident: Resident;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      cash_rec: new FormControl('', Validators.required),
      units: new FormControl('', Validators.required),
    });
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

  editBtn(cashRec: string, start: string, end: string, amount: string, units: string) {
    console.log(this.resident);
    let bill: Billing = {
      id: this.id,
      start_date: start,
      end_date: end,
      amount_billed: amount,
      units_billed: units,
      approved: cashRec,
      resident_id: this.resident
    }

    this.billingService.updateBilling(bill).subscribe(
      success => {
        this.modalRef.close();
        window.location.reload();
      }
    );

  }
}

import { Component, OnInit } from '@angular/core';
import { ResidentService } from 'src/app/Services/residents.service';
import { BillingService } from 'src/app/Services/billing.service';
import { Resident } from '../../Interface/resident'
import { Billing } from '../../Interface/billing'
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private residentService: ResidentService, private billingService: BillingService) { }

  residentList: Resident[] = [];


  billingList: Billing[] = [];
  daysBilled: number = 0;
  amountBilled: number = 0;
  pendingBills: Billing[] = [];

  ngOnInit(): void {

    this.getAllResidents();

    this.getAllBills();

  }


  getAllResidents() {
    let residentStorage = localStorage.getItem('residents');
    // console.log(residentStorage);
    if (residentStorage == null) {
      this.residentService.getAllResidents().subscribe(residents => {
        this.residentList = residents;
        localStorage.setItem('residents', JSON.stringify(residents));
        // console.log(this.residentList)

      }
      )
    } else {
      this.residentList = JSON.parse(localStorage.getItem('residents'));
    }


    residentStorage = localStorage.getItem('residents')
    let residentListString = JSON.stringify(this.residentList);
    let updateCondition = residentStorage !== residentListString;
    if (updateCondition) {
      this.residentService.getAllResidents().subscribe(residents => {
        this.residentList = residents;
        localStorage.setItem('residents', JSON.stringify(residents));
      }
      )
    }


  }

  getAllBills() {
    let billingStorage = localStorage.getItem('billing');
    // console.log(billingStorage);
    if (billingStorage == null) {
      this.billingService.getAllBilling().subscribe(bills => {
        this.billingList = bills;
        localStorage.setItem('billing', JSON.stringify(bills));
        bills.map(bill => {
          this.daysBilled = this.daysBilled + parseInt(bill.units_billed);
          this.amountBilled = this.amountBilled + parseInt(bill.amount_billed);
        })
      }
      )
    }
    else {
      this.billingList = JSON.parse(localStorage.getItem('billing'));

      this.billingList.map(bill => {
        this.daysBilled += parseInt(bill.units_billed);
        this.amountBilled += parseInt(bill.amount_billed);

        if (bill.approved == "Pending") {
          this.pendingBills.push(bill);
        }
      })

    }

    if (this.billingList) {
      let billingStorage = localStorage.getItem('billing')
      let billingListString = JSON.stringify(this.billingList);
      let updateCondition = billingStorage !== billingListString;

      if (updateCondition) {
        this.billingService.getAllBilling().subscribe(bills => {
          this.billingList = bills;
          localStorage.setItem('billing', JSON.stringify(bills));
          bills.map(bill => {
            this.daysBilled = this.daysBilled + parseInt(bill.units_billed);

            this.amountBilled = this.amountBilled + parseInt(bill.amount_billed);
          })

        }
        )
      }
    }

  }
}

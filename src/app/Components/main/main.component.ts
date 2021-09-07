import { Component, OnInit } from '@angular/core';
import { ResidentService } from 'src/app/Services/residents.service';
import { BillingService } from 'src/app/Services/billing.service';
import { Billing } from 'src/app/Interface/billing';
import { Resident } from 'src/app/Interface/resident';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
      console.log("1st in res")

      this.residentService.getAllResidents().subscribe(residents => {
        this.residentList = residents;
        localStorage.setItem('residents', JSON.stringify(residents));
        // console.log(this.residentList)

      }
      )
    } else {
      console.log("else in res")

      this.residentList = JSON.parse(localStorage.getItem('residents'));

    }



    let residentListString = JSON.stringify(this.residentList);
    let updateCondition = residentStorage !== residentListString;
    console.log(updateCondition)

    if (updateCondition && this.residentList) {
      this.residentService.getAllResidents().subscribe(residents => {
        this.residentList = residents;
        localStorage.setItem('residents', JSON.stringify(residents));
        console.log('updated resident')
      }
      )
    }


  }

  getAllBills() {
    let billingStorage = localStorage.getItem('billing');
    if (billingStorage == null) {
      console.log("1st if billing")
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
      console.log("else in billing")

      this.billingList = JSON.parse(localStorage.getItem('billing'));

      this.billingList.map(bill => {
        this.daysBilled += parseInt(bill.units_billed);
        this.amountBilled += parseInt(bill.amount_billed);

        if (bill.approved == "Pending") {
          this.pendingBills.push(bill);
        }
      })

    }



    billingStorage = localStorage.getItem('billing')
    let billingListString = JSON.stringify(this.billingList);
    let updateCondition = billingStorage !== billingListString;

    if (updateCondition && this.billingList) {
      this.billingService.getAllBilling().subscribe(bills => {
        this.billingList = bills;
        localStorage.setItem('billing', JSON.stringify(bills));
        console.log('updated billing')

        bills.map(bill => {
          this.daysBilled = this.daysBilled + parseInt(bill.units_billed);

          this.amountBilled = this.amountBilled + parseInt(bill.amount_billed);

        })

      }
      )
    }


  }

  approveBtn(billing_id: number): void {
    for (let i = 0; i < this.billingList.length; i++) {
      if (this.billingList[i].id == billing_id) {
        this.billingList[i].approved = 'Paid';
        this.billingService.updateBilling(this.billingList[i]).subscribe((item) => {
          // Add a approve message here
          
          localStorage.removeItem('billing');
          
        });
        
      }
    }
  }

  deniedBtn(billing_id: number): void {
    for (let i = 0; i < this.billingList.length; i++) {
      if (this.billingList[i].id == billing_id) {
        this.billingList[i].approved = 'Denied';
        this.billingService.updateBilling(this.billingList[i]).subscribe((item) => {
          // Add denied message here
          
          localStorage.removeItem('billing');


        });
      }
    }
  }

}

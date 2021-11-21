import { Component, OnInit } from '@angular/core';
import { Resident } from '../../Interface/resident';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../Services/residents.service';
import { BillingService } from 'src/app/Services/billing.service';
import { Billing } from 'src/app/Interface/billing';
import { ModalComponent } from '../modal/modal.component';
import { AddResidentComponent } from '../add-resident/add-resident.component';
import { EditResidentModalComponent } from '../edit-resident-modal/edit-resident-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-resident-detail',
  templateUrl: './resident-detail.component.html',
  styleUrls: ['./resident-detail.component.scss']
})
export class ResidentDetailComponent implements OnInit {

  modalRef: MdbModalRef<ModalComponent>;

  addResidentModal: MdbModalRef<AddResidentComponent>

  editResidentModal: MdbModalRef<EditResidentModalComponent>

  constructor(
    private route: ActivatedRoute,
    private residentService: ResidentService,
    private location: Location,
    private billingService: BillingService,
    private modalService: MdbModalService,
    private router: Router
  ) {


  }


  resident: Resident | undefined;
  billingList: Billing[] = [];


  ngOnInit(): void {
    this.getResident();
    this.getAllBilling();
  }


  openModal(id: number) {
    console.log(id);
    let bill: Billing;
    for (let i = 0; i < this.billingList.length; i++) {
      if (this.billingList[i].id === id) {
        bill = this.billingList[i]
      }
    }

    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        id: id,
        title: 'Edit Bill',
        first_name: this.resident.first_name,
        start_date: bill.start_date,
        end_date: bill.end_date,
        amount: bill.amount_billed,
        cash_rec: bill.approved,
        units: bill.units_billed
      }
    });
    // this.modalRef = this.modalService.open(ModalComponent)
  }

  openEditResidentModal() {
    this.resident;

    this.editResidentModal = this.modalService.open(EditResidentModalComponent, {
      data: {
        resident: this.resident,
      }
    });
    // this.modalRef = this.modalService.open(ModalComponent)
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
          localStorage.removeItem('billing');

        });
      }
    }
  }

  getResident(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.residentService.getResident(id).subscribe(resident => this.resident = resident);
  }


  goBack(): void {
    this.router.navigate(['/residents']);
  }

  save(): void {
    if (this.resident) {
      this.residentService.updateResident(this.resident).subscribe(() => this.goBack());
    }
  }

  runNode(startDate: string, endDate: string, residentId: number): void {
    this.residentService.runFormInputPost(startDate, endDate, residentId).subscribe((item) => console.log(item));
    let dayStart = startDate.slice(3, 5);
    let dayEnd = endDate.slice(3, 5);

    let units = parseInt(dayEnd) - parseInt(dayStart) + 1;
    let amount_billed = units * parseInt(this.resident.amount);

    let bill: Billing = {
      start_date: startDate,
      end_date: endDate,
      approved: 'Pending',
      units_billed: units.toString(),
      amount_billed: amount_billed.toString(),
      id: 0,
      resident_id: this.resident
    }

    this.billingService.addBilling(bill).subscribe(item => {
      this.billingList.push(item);
    }
    );
    localStorage.removeItem('billing');

  }

  addBill(b: Billing) {
    this.billingService.addBilling(b).subscribe(
      success => {
        // Add a success message here

      }
    );
  }

  getAllBilling(): void {
    this.billingService.getAllBilling().subscribe(resp => {
      let items = resp.body.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      });
      this.billingList = items
    });
  }

  deleteResident(): void {
    let check = false;

    if (confirm('Are you sure you want to delete this Billing?')) {
      check = true;
    }
    if (check) {
      this.residentService.deleteResident(this.resident.id).subscribe((deleted) => {
        this.router.navigateByUrl('/resident-list');
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ResidentService } from 'src/app/Services/residents.service';
import { Resident } from '../../Interface/resident';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddResidentComponent } from '../add-resident/add-resident.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.scss']
})
export class ResidentListComponent implements OnInit {

  constructor(private residentService: ResidentService, private modalService: MdbModalService, private cookieService: CookieService) { }

  addResidentModal: MdbModalRef<AddResidentComponent>
  residentList: Resident[];

  ngOnInit(): void {
    this.getAllResidentsEtag();
  }


  openModal(): void {
    this.addResidentModal = this.modalService.open(AddResidentComponent, {
      data: {
        residentList: this.residentList
      }
    });
  }


  getAllResidentsEtag(): void {
    this.residentService.getAllRedientsEtag().subscribe(resp => {
      if (resp == undefined) {
        let residents = JSON.parse(localStorage.getItem('residents'));
        this.residentList = residents.sort((a, b) => {
          if (a.id != undefined && b.id != undefined) {
            return a.id - b.id;
          }
          return 0;
        });
        return;
      }
      let residents = resp.body
      localStorage.setItem('residents', JSON.stringify(residents));
      
      this.residentList = residents.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      })
      
      let etag = resp.headers.get('ETag');
      this.cookieService.set('residentEtag', etag);
      
    });
  }

}

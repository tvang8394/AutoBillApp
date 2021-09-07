import { Component, OnInit } from '@angular/core';
import { ResidentService } from 'src/app/Services/residents.service';
import { Resident } from '../../Interface/resident';

@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.scss']
})
export class ResidentListComponent implements OnInit {

  constructor(private residentService: ResidentService) { }


  residentList: Resident[];

  ngOnInit(): void {
    
    if (localStorage.getItem('residents') == null) {
      this.getAllResidents();

    } else {
      this.residentList = JSON.parse(localStorage.getItem('residents'));
    }

  }

  getAllResidents(): void {
    this.residentService.getAllResidents().subscribe(
      residents => {
        localStorage.setItem('residents', JSON.stringify(residents));
        this.residentList = residents
      }
    );
  }


}

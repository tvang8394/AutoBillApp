import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }
  url: string;
  ngOnInit(): void {
    let allUrl = window.location.href;
    console.log(allUrl.split('/'));
    console.log(this.url);
    let endpoint = allUrl.split('/')[3];
    this.url = endpoint;

    
  }

}

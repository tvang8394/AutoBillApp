import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private location: Location) { }
  url: string;
  loggedIn: boolean;

  ngOnInit(): void {
    
    let auth = sessionStorage.getItem('auth');

    if (auth) {
      this.loggedIn = true;
    }
  }


  logout() {
    sessionStorage.removeItem('auth');
    window.location.href = '/login';
  }
}

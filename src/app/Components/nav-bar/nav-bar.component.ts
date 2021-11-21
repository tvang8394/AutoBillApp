import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private location: Location) { 

  }
  url: string;
  loggedIn: boolean = false;
  authSession: string = sessionStorage.getItem('auth');

  ngOnInit(): void {
    
    let auth = sessionStorage.getItem('auth');
    if (auth) {
      this.loggedIn = true;
    }
    
    this.router.events.pipe().subscribe(event => {
      if (event instanceof NavigationStart) {
        if(event.url == '/main') {
          this.loggedIn = true;
        }
      }
    }
    );
  }



  logout() {
    sessionStorage.removeItem('auth');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}

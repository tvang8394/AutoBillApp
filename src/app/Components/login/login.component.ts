import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../Interface/user';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) { }


  ngOnInit(): void {
    this.checkLoggIn();
  }

  login(username: string, password: string): void {
    let user: User = {
      id: 0,
      first_name: '',
      last_name: '',
      username: username,
      password: password
    }

    this.loginService.getLogin(user).subscribe(token => {
      if (token != null) {
        sessionStorage.setItem('auth', token);
        this.router.navigate(['/main']);
      }
    }, error => {
      if (error.status == 403) {
        alert('Invalid username or password');
      }
    });
  }

  checkLoggIn(): boolean {
    if (sessionStorage.getItem('auth') != null) {
      this.router.navigate(['/main']);
      return true;
      
    } else {

      return false;
    }
  }
 
}

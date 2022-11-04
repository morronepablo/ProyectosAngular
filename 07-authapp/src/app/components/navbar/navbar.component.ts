import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated) {
        this.isLogged = true;
      }
    })
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout();
  }

}

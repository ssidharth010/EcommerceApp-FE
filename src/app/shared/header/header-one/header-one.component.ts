import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  loggedIn: boolean = false;

  public stick: boolean = false;

  constructor(private authService: AuthService) {
    const currentUser = this.authService.currentUserValue;
    this.loggedIn = currentUser && currentUser.token;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('cartItems');
      window.location.reload()
    }
    );
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

}

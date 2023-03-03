import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.email, Validators.required]),
    password: new FormControl('',[
      Validators.minLength(8), Validators.required])
});
  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    console.log(this.loginForm)
  }

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res=>{
        // this.loginForm.value.error;
        localStorage.setItem('currentUser', JSON.stringify(res))
        this._router.navigate(['/app/home'])
      })
    }
  }
}

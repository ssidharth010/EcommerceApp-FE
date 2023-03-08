import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup = new FormGroup({
    first_name: new FormControl('',[Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    email: new FormControl('',[
      Validators.email, Validators.required]),
    password: new FormControl('',[
      Validators.minLength(8), Validators.required])
  });
  constructor(private toastrService: ToastrService, private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  createAcc(){
    if(this.regForm.valid){
      this.authService.createAccount(this.regForm.value).subscribe(res=>{
        this._router.navigate(['/page/login'])
      }, error =>{
        this.toastrService.error('Email already exist');
      })
    }
  }
}

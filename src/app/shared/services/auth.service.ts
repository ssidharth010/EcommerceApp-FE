import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        private toastrService: ToastrService) { }

    login(email, password): Observable<any> {
        return this.http.post<any>('auth/login', {email: email, password: password}).pipe(map((res: any) => res.data));
    }

    logout(): Observable<any> {
        return this.http.post<any>('auth/logout',{}).pipe(map((res: any) => res.data));
    }

    get currentUserValue(){
        return JSON.parse(localStorage.getItem('currentUser'))
    }
}
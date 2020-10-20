import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUsers().pipe(
            catchError(error => {
                // tslint:disable-next-line: quotemark
                this.alertify.error("Problem retrieving data");
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
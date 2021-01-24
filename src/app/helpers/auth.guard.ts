import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from 'src/app/patient-forms-component/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const patient = this.accountService.patientValue;
        if (patient) {
            return true;
        }

        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
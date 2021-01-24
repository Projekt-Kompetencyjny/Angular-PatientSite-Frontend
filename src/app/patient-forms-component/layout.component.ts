import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/patient-forms-component/account.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        if (this.accountService.patientValue) {
            this.router.navigate(['/']);
        }
    }
}
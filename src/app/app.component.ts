import { Component } from '@angular/core';

import { AccountService } from 'src/app/patient-forms-component/account.service';
import { Patient } from 'src/app/patient-forms-component/patient';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    patient: Patient;

    constructor(private accountService: AccountService) {
        this.accountService.patient.subscribe(x => this.patient = x);
    }

    logout() {
        this.accountService.logout();
    }
}
import { Component } from '@angular/core';

import { Patient } from 'src/app/patient-forms-component/patient';
import { AccountService } from 'src/app/patient-forms-component/account.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    patient: Patient;

    constructor(private accountService: AccountService) {
        this.patient = this.accountService.patientValue;
    }
}
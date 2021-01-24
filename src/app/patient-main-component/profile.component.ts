import { Component } from '@angular/core';

import { Patient } from 'src/app/patient-forms-component/patient';
import { AccountService } from 'src/app/patient-forms-component/account.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent { 
    patient: Patient;
    loading = false;
    submitted = false;
    accept = false;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) { this.patient = this.accountService.patientValue; }

    onSubmitcheck() {
        if(this.accept == false) this.accept = true;
        else this.accept = false;
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        this.loading = true;

        this.accountService.delete(this.patient.patientID)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Twoje Konto zostało usunięte', { keepAfterRouteChange: true });
                },
                error: error => {
                    this.accept = false;
                    this.alertService.error(error);
                    this.loading = false;
                }
            }
        );
    }
}
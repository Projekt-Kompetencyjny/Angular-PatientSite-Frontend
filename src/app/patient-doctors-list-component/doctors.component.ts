import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';
import { AccountService } from '../patient-forms-component';

@Component({
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
    doctors = null;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.alertService.clear();

        this.accountService.getDoctors()
            .pipe(first())
            .subscribe(doctors => this.doctors = doctors)
    }
}
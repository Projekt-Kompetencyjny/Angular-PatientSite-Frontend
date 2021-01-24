import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/patient-forms-component/account.service';
import { AlertService } from '../alert-component/alert.service';
import { Patient } from '../patient-forms-component/patient';

@Component({
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    accept = false;
    patient: Patient;

    states = ['dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie',
            'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { this.patient = this.accountService.patientValue; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required]
        });

        this.form.patchValue(this.patient);
    }

    get f() { return this.form.controls; }

    onSubmitcheck() {
        if(this.accept == false) this.accept = true;
        else this.accept = false;
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.update(this.patient.patientID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Twoje dane zostały zmienione', { keepAfterRouteChange: true });
                    this.router.navigate(['../profile'], { relativeTo: this.route });
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
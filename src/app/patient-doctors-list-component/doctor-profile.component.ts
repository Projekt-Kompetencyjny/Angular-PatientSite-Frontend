import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';
import { AccountService, Patient } from '../patient-forms-component';
import { Doctor } from './doctors';
  
@Component({
    templateUrl: './doctor-profile.component.html',
    styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
    loading = false;
    accept = false;
    id: string;
    hours = ['10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'];
    minDate: Date;
    maxDate: Date;
    doctor: Doctor;
    patient: Patient;
    form: FormGroup;

    myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        return day !== 0 && day !== 6;
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private alertService: AlertService,
    ) { this.patient = this.accountService.patientValue; 
        const currentDate = new Date()
        this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        this.maxDate = new Date(currentDate.getFullYear() + 5, 11, 31)
    }

    ngOnInit(){
        this.id = this.route.snapshot.params['id'];
        this.accountService.getDoctorByID(this.id)
            .pipe(first())
            .subscribe(doctor => this.doctor = doctor)
        
        this.accountService.getHours(localStorage.getItem('Date'))
            .pipe(first())
            .subscribe(hours => this.hours = hours)

        localStorage.setItem('Date', '');

        this.reactiveForm()
    }

    onSubmitcheck() {
        if(this.accept == false) {
            this.accept = true;
        } 
        else this.accept = false;
    }

    reactiveForm() {
        this.form = this.formBuilder.group({
            reservationDate: ['', [Validators.required]],
            reservationTime: ['', [Validators.required]],
            reservationType: ['Online'],
            doctorId: [this.id],
            patientId: [this.patient.patientID]
        })
    }

    date(e) {
        var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
        this.form.get('reservationDate').setValue(convertDate, {
          onlyself: true
        })
    }

    checkReservation() {
        this.alertService.clear();
        localStorage.setItem('Date', this.form.controls.reservationDate.value);
        window.location.reload();
    }
  
    addReservation() {
        this.alertService.clear();
        
        this.accountService.createReservation(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Termin został zarezerwowany', { keepAfterRouteChange: true });
                },
                error: error => {
                    this.alertService.error(error);
                }
            }
        );
        this.form.controls.reservationDate.setValue('');
        this.form.controls.reservationTime.setValue('');
        this.accept = false;
    }
}
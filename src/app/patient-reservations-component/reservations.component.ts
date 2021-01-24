import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';
import { AccountService, Patient } from '../patient-forms-component';
import { Reservation } from './reservation';

@Component({
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit{
    checkAlert = '';
    accept = false;
    loading = false;
    submitted = false;
    index: string;
    patient: Patient;
    reservations: Reservation[];

    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
    ) { this.patient = this.accountService.patientValue; }

    ngOnInit(){
        this.checkAlert = localStorage.getItem('checkAlert');
        localStorage.setItem('checkAlert', '');
        
        if (this.checkAlert == 'true') {
            this.alertService.info('Twoja rezerwacja została usunięta');
        }
        this.accountService.getReservations(this.patient.patientID)
            .pipe(first())
            .subscribe(reservations => this.reservations = reservations)
    }

    onSubmitcheck(i: string) {
        if(this.accept == false) {
            this.index = i;
            this.accept = true;
        } 
        else this.accept = false;
    }

    deleteReservation() {
        this.submitted = true;
        this.alertService.clear();
        this.loading = true;

        this.accountService.deleteReservation(this.reservations[this.index].reservationId, this.patient.patientID)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Twoja rezerwacja została usunięta', { keepAfterRouteChange: true });
                    this.checkAlert = 'true';
                    localStorage.setItem("checkAlert", this.checkAlert);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            }
        );

        window.location.reload();
    }
}
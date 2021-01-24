import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, Patient } from '../patient-forms-component';
import { Reservation } from './reservation';

@Component({
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit{
    patient: Patient;
    reservation: Reservation;
    id: string;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
    ) { this.patient = this.accountService.patientValue; 
        this.id = this.route.snapshot.params['id']; }

    ngOnInit() {
        this.accountService.getReservation(this.id)
            .pipe(first())
            .subscribe(Reservation => this.reservation = Reservation)
    }
}
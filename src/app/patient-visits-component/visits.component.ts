import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService, Patient } from '../patient-forms-component';
import { Visit } from './visit';

@Component({
    templateUrl: './visits.component.html',
    styleUrls: ['./visits.component.css'],
})
export class VisitComponent implements OnInit{
    patient: Patient;
    visits: Visit[];

    constructor(private accountService: AccountService) {
        this.patient = this.accountService.patientValue;
    }
    
    ngOnInit(){
        this.accountService.getVisits(this.patient.patientID)
            .pipe(first())
            .subscribe(visits => this.visits = visits)
    }
 }

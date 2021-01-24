import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, Patient } from '../patient-forms-component';
import { Visit } from './visit';

@Component({
    templateUrl: './visit-info.component.html',
    styleUrls: ['./visit-info.component.css'],
})
export class VisitInfoComponent implements OnInit{
    id: string;
    patient: Patient;
    visit: Visit;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute
    ) { this.patient = this.accountService.patientValue;
        this.id = this.route.snapshot.params['id']; }

    ngOnInit(){
        this.accountService.getVisit(this.id)
            .pipe(first())
            .subscribe(visit => this.visit = visit)
    }
}
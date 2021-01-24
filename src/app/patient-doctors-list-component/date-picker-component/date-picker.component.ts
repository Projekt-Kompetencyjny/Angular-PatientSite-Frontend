import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert-component/alert.service';
import { AccountService, Patient } from 'src/app/patient-forms-component';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit{
  id: string;
  patient: Patient;

  constructor(
      private accountService: AccountService,
      private route: ActivatedRoute,
      private alertService: AlertService
  ) { this.patient = this.accountService.patientValue; }
    
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  checkReservation() {

  }

  addReservation() {
    
  }
}
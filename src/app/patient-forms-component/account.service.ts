import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Patient, PatientRegister } from 'src/app/patient-forms-component/patient';
import { Doctor } from '../patient-doctors-list-component/doctors';
import { Visit } from '../patient-visits-component/visit';
import { Reservation } from '../patient-reservations-component/reservation';

@Injectable({ providedIn: 'root' })
export class AccountService {
    
    private patientSubject: BehaviorSubject<Patient>;
    public patient: Observable<Patient>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.patientSubject = new BehaviorSubject<Patient>(JSON.parse(localStorage.getItem('patient')));
        this.patient = this.patientSubject.asObservable();
    }

    public get patientValue(): Patient {
        return this.patientSubject.value;
    }

    login(email, password) {
        return this.http.post<Patient>(`${environment.apiUrl}/patient/login`, { email, password })
            .pipe(map(patient => {
                localStorage.setItem('patient', JSON.stringify(patient));
                this.patientSubject.next(patient);
                return patient;
            }));
    }

    logout() {
        localStorage.removeItem('patient');
        this.patientSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(patient: PatientRegister) {
        return this.http.post(`${environment.apiUrl}/patient/register`, patient);
    }

    getDoctors() {
        return this.http.get<Doctor[]>(`${environment.apiUrl}/patient/get/doctors`);
    }

    getDoctorByID(id: string) {
        return this.http.get<Doctor>(`${environment.apiUrl}/patient/get/doctor/${id}`);
    }

    update(id: string, params) {
        return this.http.put<Patient>(`${environment.apiUrl}/patient/update/${id}`, params)
            .pipe(map(patient => {
                const newPatient = { ...this.patientValue, ...params };
                localStorage.setItem('user', JSON.stringify(newPatient));
                this.patientSubject.next(newPatient);
                return patient;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/patient/delete/${id}`)
            .pipe(map(x => {
                this.logout();
                return x;
            })
        );
    }

    getHours(date: string) {
        return this.http.get<string[]>(`${environment.apiUrl}/reservation/get-list/hours/${date}`);
    }

    createReservation(reservation: Reservation) {
        return this.http.post(`${environment.apiUrl}/reservation/create`, reservation);
    }

    getReservations(id: string) {
        return this.http.get<Reservation[]>(`${environment.apiUrl}/reservation/get-list/patient/${id}`);
    }

    getReservation(id) {
        return this.http.get<Reservation>(`${environment.apiUrl}/reservation/get/${id}`);
    }

    deleteReservation(reservationId, patientId) {
        let params = new HttpParams()
            .set('reservationId', reservationId)
            .set('patientId', patientId);

        return this.http.delete(`${environment.apiUrl}/reservation/cancel`, { params: params })
    }

    getVisits(id: string) {
        return this.http.get<Visit[]>(`${environment.apiUrl}/patient/visit/get-list/${id}`);
    }

    getVisit(id: string) {
        return this.http.get<Visit>(`${environment.apiUrl}/patient/visit/get/${id}`)
    }
}
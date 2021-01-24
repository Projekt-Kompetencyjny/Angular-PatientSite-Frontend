import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/patient-main-component/home.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';

const accountModule = () => import('src/app/patient-forms-component/account.module').then(x => x.AccountModule);
const patientModule = () => import('src/app/patient-main-component/patient.module').then(x => x.PatientModule);
const doctorsModule = () => import('src/app/patient-doctors-list-component/doctors.module').then(x => x.DoctorsModule);
const reservationsModule = () => import('src/app/patient-reservations-component/reservations.module').then(x => x.ReservationsModule);
const visitModule = () => import('src/app/patient-visits-component/visits.module').then(x => x.VisitModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: patientModule, canActivate: [AuthGuard] },
    { path: 'doctors', loadChildren: doctorsModule, canActivate: [AuthGuard] },
    { path: 'reservations', loadChildren: reservationsModule, canActivate: [AuthGuard] },
    { path: 'visitation', loadChildren: visitModule, canActivate: [AuthGuard]},
    { path: 'account', loadChildren: accountModule },
    

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorProfileComponent } from './doctor-profile.component';
import { DoctorsComponent } from './doctors.component';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DoctorsComponent },
            { path: ':id', component: DoctorProfileComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorsRoutingModule { }
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PatientRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ProfileComponent,
        ProfileEditComponent
    ]
})
export class PatientModule { }
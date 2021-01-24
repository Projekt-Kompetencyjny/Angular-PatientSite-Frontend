import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { DoctorsComponent } from './doctors.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorProfileComponent } from './doctor-profile.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePickerComponent } from './date-picker-component/date-picker.component';
import { DemoMaterialModule } from './date-picker-component/date-picker-module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DoctorsRoutingModule,
        DemoMaterialModule
    ],
    declarations: [
        LayoutComponent,
        DoctorsComponent,
        DoctorProfileComponent,
        DatePickerComponent
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill'}},
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}
    ]
})
export class DoctorsModule { }
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { MeetingComponent } from './meeting.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ReservationsRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        ReservationsComponent,
        MeetingComponent
    ],
})
export class ReservationsModule { }
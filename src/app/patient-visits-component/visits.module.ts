import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { VisitRoutingModule } from './visits-routing.module';
import { VisitComponent } from './visits.component';
import { VisitInfoComponent } from './visit-info.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VisitRoutingModule
    ],
    declarations: [
        LayoutComponent,
        VisitComponent,
        VisitInfoComponent
    ]
})
export class VisitModule { }
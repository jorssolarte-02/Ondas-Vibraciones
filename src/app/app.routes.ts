import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard.component';
import { ProgressiveComponent } from './features/progressive.component';
import { StandingComponent } from './features/standing.component';
import { LabComponent } from './features/lab.component';
import { AnalysisComponent } from './features/analysis.component';
import { TheoryComponent } from './features/theory.component';
export const routes: Routes = [
 {path:'', component:DashboardComponent, title:'ONDA LAB · Laboratorio'},
 {path:'progresiva', component:ProgressiveComponent, title:'Onda progresiva · ONDA LAB'},
 {path:'estacionaria', component:StandingComponent, title:'Onda estacionaria · ONDA LAB'},
 {path:'laboratorio', component:LabComponent, title:'Parámetros físicos · ONDA LAB'},
 {path:'analisis', component:AnalysisComponent, title:'Análisis · ONDA LAB'},
 {path:'fundamentos', component:TheoryComponent, title:'Fundamentos · ONDA LAB'},
 {path:'**', redirectTo:''}
];

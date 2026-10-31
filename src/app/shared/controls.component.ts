import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaveParameters } from '../core/models/physics.model';
import { WaveSimulationService } from '../core/services/wave-simulation.service';
@Component({selector:'ol-controls',standalone:true,imports:[FormsModule],template:`<section class="panel controls"><div class="panel-title"><div><span class="eyebrow">AJUSTES DEL SISTEMA</span><h3>Parámetros</h3></div><span class="tiny-status"><i></i> EN VIVO</span></div>
@for (field of fields; track field.key) {<label class="control-row"><span class="control-name">{{field.name}} <small>{{field.symbol}} · {{field.unit}}</small></span><span class="number-wrap"><input type="number" [min]="field.min" [max]="field.max" [step]="field.step" [ngModel]="sim.parameters()[field.key]" (ngModelChange)="set(field.key,$event)"><em>{{field.unit}}</em></span><input class="range" type="range" [min]="field.min" [max]="field.max" [step]="field.step" [ngModel]="sim.parameters()[field.key]" (ngModelChange)="set(field.key,$event)"><small class="hint">{{field.hint}}</small></label>}
@if (mode==='standing') {<label class="control-row"><span class="control-name">Armónico <small>n · entero</small></span><span class="number-wrap"><input type="number" min="1" max="10" step="1" [ngModel]="sim.harmonic()" (ngModelChange)="setHarmonic($event)"></span><input class="range" type="range" min="1" max="10" step="1" [ngModel]="sim.harmonic()" (ngModelChange)="setHarmonic($event)"><small class="hint">Cuerda fija en ambos extremos · n = 1–10</small></label><label class="compare-toggle"><input type="checkbox" [ngModel]="sim.comparison()" (ngModelChange)="sim.comparison.set($event)"><span>Comparar otro armónico</span></label>@if(sim.comparison()){<label class="control-row"><span class="control-name">Armónico de comparación <small>m</small></span><span class="number-wrap"><input type="number" min="1" max="10" step="1" [ngModel]="sim.comparisonHarmonic()" (ngModelChange)="setComparisonHarmonic($event)"></span><input class="range" type="range" min="1" max="10" step="1" [ngModel]="sim.comparisonHarmonic()" (ngModelChange)="setComparisonHarmonic($event)"><small class="hint">Se superpone con el armónico n seleccionado.</small></label>}}
<div class="playback"><span>Velocidad de reproducción</span><b>{{sim.playback().toFixed(1)}}×</b><input class="range" type="range" min="0.2" max="2" step="0.1" [ngModel]="sim.playback()" (ngModelChange)="sim.playback.set($event)"></div></section>`})
export class ControlsComponent {
 @Input() mode:'progressive'|'standing'='progressive'; readonly sim=inject(WaveSimulationService);
 fields:{key:keyof WaveParameters,name:string,symbol:string,unit:string,min:number,max:number,step:number,hint:string}[]=[
 {key:'tension',name:'Tensión',symbol:'T',unit:'N',min:1,max:200,step:1,hint:'Fuerza aplicada a la cuerda.'},
 {key:'density',name:'Densidad lineal',symbol:'μ',unit:'kg/m',min:.001,max:.05,step:.001,hint:'Masa por unidad de longitud.'},
 {key:'frequency',name:'Frecuencia',symbol:'f',unit:'Hz',min:.5,max:20,step:.1,hint:'Oscilaciones por segundo.'},
 {key:'amplitude',name:'Amplitud',symbol:'A',unit:'m',min:.01,max:.3,step:.01,hint:'Desplazamiento máximo transversal.'},
 {key:'length',name:'Longitud',symbol:'L',unit:'m',min:.5,max:5,step:.1,hint:'Longitud de la cuerda.'}];
 set(key:keyof WaveParameters,value:number){if(!Number.isFinite(value))return;const field=this.fields.find(item=>item.key===key)!;this.sim.update(key,Math.min(field.max,Math.max(field.min,value)));}
 setHarmonic(value:number){if(Number.isFinite(value))this.sim.harmonic.set(Math.min(10,Math.max(1,Math.round(value))))}
 setComparisonHarmonic(value:number){if(Number.isFinite(value))this.sim.comparisonHarmonic.set(Math.min(10,Math.max(1,Math.round(value))))}
}

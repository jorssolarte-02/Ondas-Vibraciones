import { Injectable, inject } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { WaveParameters } from '../models/physics.model';
import { PhysicsService } from './physics.service';
Chart.register(...registerables);

@Injectable({providedIn:'root'})
export class ChartService {
 private physics=inject(PhysicsService);
 create(canvas:HTMLCanvasElement,kind:string,p:WaveParameters):Chart {
  const r=this.physics.results(p),labels:number[]=[],values:number[]=[];let title='',xlabel='',ylabel='';
  if(kind==='time'){title='Desplazamiento de la partícula · x = L/4';xlabel='Tiempo (s)';ylabel='y (m)';for(let i=0;i<=100;i++){const t=i/(100*p.frequency);labels.push(t);values.push(this.physics.progressiveY(p.length/4,t,p));}}
  else if(kind==='tension'){title='Velocidad frente a tensión';xlabel='Tensión (N)';ylabel='v (m/s)';for(let x=10;x<=200;x+=10){labels.push(x);values.push(Math.sqrt(x/p.density));}}
  else if(kind==='density'){title='Velocidad frente a densidad lineal';xlabel='Densidad (kg/m)';ylabel='v (m/s)';for(let i=1;i<=20;i++){const x=i*.002;labels.push(x);values.push(Math.sqrt(p.tension/x));}}
  else if(kind==='harmonics'){title='Frecuencia frente al armónico';xlabel='Número de armónico n';ylabel='fₙ (Hz)';for(let n=1;n<=10;n++){labels.push(n);values.push(n*r.speed/(2*p.length));}}
  else{title='Perfil de la cuerda · t = 0';xlabel='Posición x (m)';ylabel='y (m)';for(let i=0;i<=100;i++){const x=p.length*i/100;labels.push(x);values.push(this.physics.progressiveY(x,0,p));}}
  const cfg:ChartConfiguration<'line'>={type:'line',data:{labels,datasets:[{label:title,data:values,borderColor:'#35afff',backgroundColor:'rgba(53,175,255,.12)',pointRadius:kind==='harmonics'?3:0,pointBackgroundColor:'#64c8ff',borderWidth:2,fill:true,tension:.25}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},title:{display:true,text:title,color:'#f1f6fc',font:{size:14,weight:'bold'}},tooltip:{enabled:true}},scales:{x:{title:{display:true,text:xlabel,color:'#9bafc5'},ticks:{color:'#9bafc5',maxTicksLimit:8},grid:{color:'rgba(155,175,197,.1)'}},y:{title:{display:true,text:ylabel,color:'#9bafc5'},ticks:{color:'#9bafc5'},grid:{color:'rgba(155,175,197,.1)'}}}}};
  return new Chart(canvas,cfg);
 }
}

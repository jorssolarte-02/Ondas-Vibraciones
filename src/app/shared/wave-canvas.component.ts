import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, effect, inject } from '@angular/core';
import { AnimationService } from '../core/services/animation.service';
import { PhysicsService } from '../core/services/physics.service';
import { WaveSimulationService } from '../core/services/wave-simulation.service';
@Component({selector:'ol-wave-canvas',standalone:true,template:`<canvas #canvas aria-label="Visualización animada de la cuerda"></canvas>` ,styles:[`:host{display:block;width:100%;height:100%;min-height:270px}canvas{width:100%;height:100%;display:block}`]})
export class WaveCanvasComponent implements AfterViewInit,OnDestroy {
 @ViewChild('canvas',{static:true}) canvas!:ElementRef<HTMLCanvasElement>; @Input() mode:'progressive'|'standing'='progressive';
 private sim=inject(WaveSimulationService);private physics=inject(PhysicsService);private animation=inject(AnimationService);private ctx!:CanvasRenderingContext2D;private resizeObserver?:ResizeObserver;private elapsed=0;private viewReady=false;
 constructor(){effect(()=>{this.sim.parameters();this.sim.harmonic();this.sim.comparison();this.sim.comparisonHarmonic();this.sim.running();this.sim.playback();const reset=this.sim.resetVersion();if(reset!==this.lastReset){this.elapsed=0;this.lastReset=reset;}if(this.viewReady)this.draw(0);});}
 private lastReset=0;
 ngAfterViewInit(){this.ctx=this.canvas.nativeElement.getContext('2d')!;this.viewReady=true;this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(this.canvas.nativeElement);this.resize();this.animation.start(dt=>{if(this.sim.running())this.elapsed+=dt*this.sim.playback();this.draw(this.elapsed);});}
 private resize(){const c=this.canvas.nativeElement,r=c.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);c.width=Math.max(1,Math.round(r.width*dpr));c.height=Math.max(1,Math.round(r.height*dpr));this.ctx.setTransform(dpr,0,0,dpr,0,0);this.draw(this.elapsed);}
 private draw(t:number){if(!this.ctx)return;const c=this.canvas.nativeElement,ctx=this.ctx,w=c.clientWidth,h=c.clientHeight,p=this.sim.parameters(),n=this.sim.harmonic(),stat=this.mode==='standing',pad=48,mid=h*.51,scale=Math.min(h*.28/Math.max(.3,p.amplitude*2),h*.9);ctx.clearRect(0,0,w,h);
  const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,'#123554');grad.addColorStop(.5,'#35afff');grad.addColorStop(1,'#123554');
  const gridAmp=Math.min(h*.28,p.amplitude*scale*2);ctx.strokeStyle='rgba(124,169,208,.16)';ctx.lineWidth=1;for(let i=0;i<5;i++){const y=mid-gridAmp+i*gridAmp/2;ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();}
  ctx.setLineDash([5,7]);ctx.strokeStyle='rgba(155,175,197,.42)';ctx.beginPath();ctx.moveTo(pad,mid);ctx.lineTo(w-pad,mid);ctx.stroke();ctx.setLineDash([]);
  const s=this.physics.standing(p,n),r=this.physics.results(p),L=p.length;
  if(stat){ctx.setLineDash([4,5]);ctx.strokeStyle='rgba(255,180,84,.42)';ctx.lineWidth=1;for(const sign of [-1,1]){ctx.beginPath();for(let i=0;i<=240;i++){const u=i/240,x=pad+u*(w-2*pad),envelope=2*p.amplitude*Math.abs(Math.sin(s.waveNumber*u*L));const y=mid+sign*envelope*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.setLineDash([]);}
  if(stat&&this.sim.comparison()){const m=this.sim.comparisonHarmonic();ctx.beginPath();for(let i=0;i<=320;i++){const u=i/320,x=pad+u*(w-2*pad),position=u*L,y=mid-this.physics.standingY(position,t,p,m)*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.strokeStyle='#ffb454';ctx.lineWidth=1.8;ctx.setLineDash([7,5]);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#ffb454';ctx.font='11px Inter, sans-serif';ctx.fillText(`COMPARACIÓN · n = ${m}`,w-pad-135,24);}
  ctx.beginPath();for(let i=0;i<=320;i++){const u=i/320,x=pad+u*(w-2*pad),position=u*L;const y=mid-(stat?this.physics.standingY(position,t,p,n):this.physics.progressiveY(position,t,p))*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.strokeStyle=grad;ctx.lineWidth=3;ctx.shadowBlur=15;ctx.shadowColor='#35afff';ctx.stroke();ctx.shadowBlur=0;
  if(stat){for(let j=0;j<=n;j++){const x=pad+j*(w-2*pad)/n;ctx.beginPath();ctx.arc(x,mid,5,0,Math.PI*2);ctx.fillStyle=j===0||j===n?'#f1f6fc':'#64c8ff';ctx.fill();}for(let j=0;j<n;j++){const u=(j+.5)/n,x=pad+u*(w-2*pad);ctx.beginPath();ctx.arc(x,mid,4,0,Math.PI*2);ctx.fillStyle='#ffb454';ctx.fill();}ctx.fillStyle='#ffb454';ctx.font='12px Inter, sans-serif';ctx.fillText(`${n} vientre${n>1?'s':''} · λ = ${s.wavelength.toFixed(3)} m`,pad,24);}
  else {for(let i=0;i<41;i++){const u=i/40,x=pad+u*(w-2*pad),y=mid-this.physics.progressiveY(u*L,t,p)*scale;ctx.beginPath();ctx.arc(x,y,2.7,0,Math.PI*2);ctx.fillStyle='#c6efff';ctx.fill();}ctx.fillStyle='#64c8ff';ctx.font='12px Inter, sans-serif';ctx.fillText(`PROPAGACIÓN  →     v = ${r.speed.toFixed(2)} m/s`,pad,24);}
  ctx.fillStyle='#9bafc5';ctx.font='11px Inter, sans-serif';ctx.fillText('0 m',pad,h-15);ctx.textAlign='right';ctx.fillText(`${L.toFixed(1)} m`,w-pad,h-15);ctx.textAlign='left';
 }
 ngOnDestroy(){this.animation.stop();this.resizeObserver?.disconnect();}
}

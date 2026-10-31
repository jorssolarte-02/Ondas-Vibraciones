import { Injectable } from '@angular/core';
import { WaveParameters, WaveResults } from '../models/physics.model';
@Injectable({providedIn:'root'})
export class PhysicsService {
 results(p:WaveParameters):WaveResults {
  if (![p.tension,p.density,p.frequency,p.amplitude,p.length].every(Number.isFinite) || p.tension<=0 || p.density<=0 || p.frequency<=0 || p.amplitude<0 || p.length<=0) throw new RangeError('Los parámetros deben ser físicamente válidos.');
  const speed=Math.sqrt(p.tension/p.density), wavelength=speed/p.frequency;
  return {speed,wavelength,omega:2*Math.PI*p.frequency,waveNumber:2*Math.PI/wavelength,period:1/p.frequency};
 }
 standing(p:WaveParameters,n:number){if(!Number.isInteger(n)||n<1||n>10) throw new RangeError('El armónico debe estar entre 1 y 10.'); const speed=Math.sqrt(p.tension/p.density); return {wavelength:2*p.length/n,frequency:n*speed/(2*p.length),waveNumber:Math.PI*n/p.length,omega:Math.PI*n*speed/p.length,nodes:n-1,antinodes:n};}
 progressiveY(x:number,t:number,p:WaveParameters){const r=this.results(p);return p.amplitude*Math.sin(r.waveNumber*x-r.omega*t);}
 standingY(x:number,t:number,p:WaveParameters,n:number){const s=this.standing(p,n);return 2*p.amplitude*Math.sin(s.waveNumber*x)*Math.cos(s.omega*t);}
}

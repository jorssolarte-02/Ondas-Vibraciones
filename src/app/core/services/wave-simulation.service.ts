import { Injectable, signal } from '@angular/core';
import { DEFAULT_PARAMETERS, WaveMode, WaveParameters } from '../models/physics.model';
@Injectable({providedIn:'root'}) export class WaveSimulationService {
 readonly parameters=signal<WaveParameters>({...DEFAULT_PARAMETERS}); readonly mode=signal<WaveMode>('progressive'); readonly harmonic=signal(1);readonly comparison=signal(false);readonly comparisonHarmonic=signal(2); readonly running=signal(true); readonly playback=signal(1);readonly resetVersion=signal(0);
 update<K extends keyof WaveParameters>(key:K,value:number){this.parameters.update(p=>({...p,[key]:value}));}
 reset(){this.parameters.set({...DEFAULT_PARAMETERS});this.harmonic.set(1);this.comparison.set(false);this.comparisonHarmonic.set(2);this.playback.set(1);this.resetVersion.update(v=>v+1);}
}

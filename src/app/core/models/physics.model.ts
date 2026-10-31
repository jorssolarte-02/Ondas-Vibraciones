export interface WaveParameters { tension:number; density:number; frequency:number; amplitude:number; length:number; }
export interface WaveResults { speed:number; wavelength:number; omega:number; waveNumber:number; period:number; }
export type WaveMode = 'progressive'|'standing';
export const DEFAULT_PARAMETERS:WaveParameters={tension:50,density:0.008,frequency:5,amplitude:0.12,length:2};

import { from } from 'rxjs';
export interface CorreosGT {
    
    subject?: string,
    to?: string,
    from?: string,
    CC?: string,
    date?: string,
    uid?: number;


}

export interface CuerpoGT {
    
    subject?: string,
    from?: string,
    uid?: number;
    body?: string;


}
export interface BodyGt {
    
    subject?: string,
    html?: string,
   


}
export interface Adjunto{
    filename?: string;
    data?: string;
}
export interface NomAdj{
    filename?: string;
    path?: string;
}
export interface NomAdjEnv{
    filename?: string;
    path?: string;
}


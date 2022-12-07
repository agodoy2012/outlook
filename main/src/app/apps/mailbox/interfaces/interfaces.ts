import { from } from 'rxjs';
export interface CorreosGT {
    
    subject?: string,
    to?: string,
    from?: string,
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

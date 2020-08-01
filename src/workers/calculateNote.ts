import { getFrequency } from "../services/audio";
import { getClosestNoteFromFrequency } from '../services/notes';
import * as Comlink from 'comlink';
import {IcalcluteNote} from '../interfaces/calcluteNote';

// interface IcalcluteNote {
//     calculate(dataArray: Float32Array, sampleRate: number): void;
//     note: string;
//     frequency: number;
// }

class CalculateNote implements IcalcluteNote {
    note: string;
    frequency: number;
    calculate(dataArray: Float32Array, sampleRate: number) {
        this.frequency = getFrequency(dataArray, sampleRate);
        this.note = getClosestNoteFromFrequency(this.frequency);
    } 
}

Comlink.expose(CalculateNote);

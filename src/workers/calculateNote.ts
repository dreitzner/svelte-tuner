import { getFrequency } from "../services/audio";
import { getClosestNoteFromFrequency } from '../services/notes';
import * as Comlink from 'comlink';

interface IcalcluteNote {
    calculate(dataArray: Float32Array, sampleRate: number): void;
    note: string;
}

class CalculateNote implements IcalcluteNote {
    note: string;
    calculate(dataArray: Float32Array, sampleRate: number) {
        const frequency = getFrequency(dataArray, sampleRate);
        this.note = getClosestNoteFromFrequency(frequency);
    } 
}

Comlink.expose(CalculateNote);

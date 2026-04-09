import { getFrequency } from "$lib/services/audio";
import { getClosestNoteAndCent } from '$lib/services/notes';
import * as Comlink from 'comlink';
class CalculateNote implements IcalcluteNote {
    note: string = '';
    frequency: number = 0;
    cent: number = 0;
    calculate(dataArray: Float32Array, sampleRate: number) {
        const freq = getFrequency(dataArray, sampleRate);
        if (freq === null) return;
        this.frequency = freq;
        const data: InoteAndCent | null = getClosestNoteAndCent(this.frequency);
        if (!data) return;
        this.note = data.note;
        this.cent = data.cent;
    }
}

Comlink.expose(CalculateNote);

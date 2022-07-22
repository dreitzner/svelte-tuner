import { getFrequency } from "$lib/services/audio";
import { getClosestNoteAndCent } from '$lib/services/notes';
import * as Comlink from '$nm/comlink/dist/esm/comlink.min.mjs';
class CalculateNote implements IcalcluteNote {
    note: string;
    frequency: number;
    cent: number;
    calculate(dataArray: Float32Array, sampleRate: number) {
        this.frequency = getFrequency(dataArray, sampleRate);
        const data: InoteAndCent = getClosestNoteAndCent(this.frequency);
        if (!data) return;
        this.note = data.note;
        this.cent = data.cent;
    }
}

Comlink.expose(CalculateNote);

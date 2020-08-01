export interface IcalcluteNote {
    calculate(dataArray: Float32Array, sampleRate: number): void;
    note: string;
    frequency: number;
    cent: number;
}

export interface ICalculateNoteConstructur {
  new (): IcalcluteNote,
}

export interface InoteAndCent {
    note: string;
    cent: number;
}

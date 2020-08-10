declare interface IcalcluteNote {
    calculate(dataArray: Float32Array, sampleRate: number): void;
    note: string;
    frequency: number;
    cent: number;
}

declare interface ICalculateNoteConstructur {
  new (): IcalcluteNote,
}

declare interface InoteAndCent {
    note: string;
    cent: number;
}

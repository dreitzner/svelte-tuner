export interface IcalcluteNote {
    calculate(dataArray: Float32Array, sampleRate: number): void;
    note: string;
}

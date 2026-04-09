// See https://svelte.dev/docs/kit/types#app.d.ts

declare global {
  interface IcalcluteNote {
    calculate(dataArray: Float32Array, sampleRate: number): void;
    note: string;
    frequency: number;
    cent: number;
  }

  interface ICalculateNoteConstructur {
    new (): IcalcluteNote;
  }

  interface InoteAndCent {
    note: string;
    cent: number;
  }

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};

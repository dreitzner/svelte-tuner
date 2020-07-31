export const notes: Array<string> = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
];

const startFrequency: number = 27.5; // A0

const getNextNote = (frequency: number): number => frequency * Math.pow(2, 1/12); 

export const getClosestNoteFromFrequency = (frequency: number): string => {
    if (!frequency) return null;
    let currentA = startFrequency; // what if lower?
    while (currentA < frequency) {
        currentA *= 2;
    }
    let index: number = 0;
    let lowerFrequency: number = currentA / 2;
    let upperFrequency: number = getNextNote(lowerFrequency);

    while (!(lowerFrequency < frequency && frequency < upperFrequency)) {
        lowerFrequency = upperFrequency;
        upperFrequency = getNextNote(lowerFrequency);
        index++;
    }
    if (frequency - lowerFrequency < upperFrequency - frequency) index--;
    return notes[index];
};

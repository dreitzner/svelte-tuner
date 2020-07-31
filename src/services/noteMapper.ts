interface ISegment {
    sharp: boolean,
    t0: boolean,
    t1: boolean,
    tm0: boolean,
    tm1: boolean,
    tm2: boolean,
    tm3: boolean,
    tm4: boolean,
    m0: boolean,
    m1: boolean,
    mb0: boolean,
    mb1: boolean,
    mb2: boolean,
    mb3: boolean,
    mb4: boolean,
    b0: boolean,
    b1: boolean,
}

interface ISegments {
    'C': ISegment,
    'C#': ISegment,
    'D': ISegment,
    'D#': ISegment,
    'E': ISegment,
    'F': ISegment,
    'F#': ISegment,
    'G': ISegment,
    'G#': ISegment,
    'A': ISegment,
    'A#': ISegment,
    'B': ISegment,
    '0': ISegment,
}

const mapper: ISegments = {
    'C':
    {
        sharp: false,
                   t0: true,               t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                   m0: false,              m1: false,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: false,
                   b0: true,               b1: true,
    },
    'C#':
    {
        sharp: true,
                t0: true,               t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                m0: false,              m1: false,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: false,
                b0: true,               b1: true,
    },
    'D':
    {
        sharp: false,
                    t0: false,              t1: false,
        tm0: false, tm1: false, tm2: false, tm3: false, tm4: true,
                    m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                    b0: true,              b1: true,
    },
    'D#':
    {
        sharp: true,
                t0: false,              t1: false,
        tm0: false, tm1: false, tm2: false, tm3: false, tm4: true,
                m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                b0: true,              b1: true,
    },
    'E':
    {
        sharp: false,
                t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: false,
                b0: true,              b1: true,
    },
    'F':
    {
        sharp: false,
                    t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                    m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: false,
                    b0: false,              b1: false,
    },
    'F#':
    {
        sharp: true,
                t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: false,
                b0: false,              b1: false,
    },
    'G':
    {
        sharp: false,
                    t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                    m0: false,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                    b0: true,              b1: true,
    },
    'G#':
    {
        sharp: true,
                t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                m0: false,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                b0: true,              b1: true,
    },
    'A':
    {
        sharp: false,
                    t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: true,
                    m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                    b0: false,              b1: false,
    },
    'A#':
    {
        sharp: true,
                t0: true,              t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: true,
                m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                b0: false,              b1: false,
    },
    'B':
    {
        sharp: false,
                    t0: false,              t1: false,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: false,
                    m0: true,              m1: true,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                    b0: true,              b1: true,
    },
    '0':
    {
        sharp: false,
                   t0: true,               t1: true,
        tm0: true, tm1: false, tm2: false, tm3: false, tm4: true,
                   m0: false,              m1: false,
        mb0: true, mb1: false, mb2: false, mb3: false, mb4: true,
                    b0: true,              b1: true,
    },
};

export const noteMapper = (note: string): ISegment => {
    return mapper[note] || mapper['0'];
} 
interface IinitUserAudio {
    analyserNode: AnalyserNode,
    sampleRate: number,
}

let analyserNode: AnalyserNode;
let dataArray: Float32Array<ArrayBuffer>;
let stream: MediaStream;

const getMedia = async (): Promise<MediaStream | null> => {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return stream;
    } catch (err) {
        console.error('can\'t get audio');
        return null;
    }
}

const initUserAudio = async (): Promise<IinitUserAudio | null> => {
    const audioCtx = new AudioContext();
    const sampleRate: number = audioCtx.sampleRate;

	//Create audio source
	//Here, we use an audio file, but this could also be e.g. microphone input
	const mediaStream = await getMedia();
	if (!mediaStream) return null;
	stream = mediaStream;
    const audioSourceNode: MediaStreamAudioSourceNode = audioCtx.createMediaStreamSource(stream);

	//Create analyser node
	analyserNode = audioCtx.createAnalyser();
	analyserNode.fftSize = 32768; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    dataArray = new Float32Array(analyserNode.frequencyBinCount);

	//Set up audio node network
    audioSourceNode.connect(analyserNode);
	return {
        analyserNode,
        sampleRate,
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDataArray = (analyserNode: AnalyserNode): any => {
    analyserNode.getFloatFrequencyData(dataArray)
    return dataArray;
};

const _getIndexOfHighestValue = (dataArray: Float32Array): number => {
    return dataArray.findIndex((e) => e === Math.max(...dataArray));
}

const getFrequency = (dataArray: Float32Array, sampleRate: number): number | null => {
    if (!dataArray) return null;
    const maxIndex = _getIndexOfHighestValue(dataArray);
    return sampleRate / 2 / dataArray.length * maxIndex;
}

const stopUserAudio = (): void => {
    stream.getAudioTracks()
        .forEach(track => track.stop());
};

export {
    initUserAudio,
    getDataArray,
    stopUserAudio,
    getFrequency,
};

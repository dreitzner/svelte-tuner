interface IinitUserAudio {
    analyserNode: AnalyserNode,
    bufferLength: number,
}

let analyserNode: AnalyserNode;
let dataArray: Float32Array;
let bufferLength: number;

const getMedia = async (): Promise<MediaStream> => {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return stream;
    } catch (err) {
        console.error('can\'t get audio');
        return null;
    }
}

const initUserAudio = async (): Promise<IinitUserAudio> => {
	const audioCtx = new AudioContext();

	//Create audio source
	//Here, we use an audio file, but this could also be e.g. microphone input
	const stream: MediaStream = await getMedia();
	if (!stream) return null;
	const audioSourceNode: MediaStreamAudioSourceNode = audioCtx.createMediaStreamSource(stream);

	//Create analyser node
	analyserNode = audioCtx.createAnalyser();
	analyserNode.fftSize = 256;
	bufferLength = analyserNode.frequencyBinCount;
	dataArray = new Float32Array(bufferLength);

	//Set up audio node network
	audioSourceNode.connect(analyserNode);
	analyserNode.connect(audioCtx.destination);
	return {
        analyserNode,
        bufferLength,
    };
};

const getDataArray = (analyserNode: AnalyserNode): Float32Array => {
    analyserNode.getFloatFrequencyData(dataArray)
    return dataArray;
};

export {
    initUserAudio,
    getDataArray,
};

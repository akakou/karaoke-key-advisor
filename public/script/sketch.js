// It based ml5 Example
let audioContext
let mic
let pitch
let recorder
let avarageDiffG

async function setup() {
  // noCanvas()
  audioContext = getAudioContext()

  mic = new p5.AudioIn()
  await userStartAudio()
  mic.start(loadModel)
}

const loadModel = () =>
  pitch = ml5.pitchDetection('/model/', audioContext, mic.stream, modelLoaded)


const modelLoaded = () => {
  // select('#status').html('Model Loaded')
  console.log("Loaded")
}

let isMetronomeContinue = false

const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));


const startMetronome = async (bpm = 100) => {
  // const interval = (bpm / 60) * 1000 - 100
  const interval = (bpm / 60) / 4 * 1000 - 100

  isMetronomeContinue = true

  const osc = new p5.Oscillator('sine')

  while (isMetronomeContinue) {
    osc.start()
    await sleep(100)
    osc.stop()

    await sleep(interval)
  }
}

const stopMetrononme = () => isMetronomeContinue = false


class PitchNote {
  static scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  constructor(scale, high) {
    this.scale = scale
    this.high = high
  }

  to_string() {
    return `${this.scale}${this.high}`
  }

  static from_frequency(frequency) {
    const midiNum = freqToMidi(frequency)
    return PitchNote.from_midi(midiNum)
  }


  static from_midi(midiNum) {
    const scale = PitchNote.scale[midiNum % 12]
    const high = Math.floor(midiNum / 12) - 1

    return new PitchNote(scale, high)
  }

  static no_sound() {
    return new PitchNote('', 0)
  }
}


class Recorder {
  constructor() {
    this.voice = []
    this.timerId = 0
    this.isContinued = false
  }

  start() {
    this.getPitch()
    this.timerId = setInterval(this.getPitch.bind(this), 10);
    this.isContinued = true
  }

  stop() {
    this.isContinued = false
    clearInterval(this.timerId)
  }

  getPitch() {
    pitch.getPitch((err, frequency) => {
      const midiNum = freqToMidi(frequency)

      if (frequency && midiNum != 69) {
        this.voice.push(midiNum)

        const note = PitchNote.from_frequency(frequency)
        // select('#result').html(note.to_string())
      } else {
        // select('#result').html('No pitch detected')
      }
    })
  }
}

const recorder1 = new Recorder()
const recorder2 = new Recorder()

// const run = (recorder) => {
//   if (recorder.isContinued)
//     recorder.stop()
//   else
//     recorder.start()
// }

const calcAvarageDiff = () => {
  const sum1 = recorder1.voice.reduce((a, x) => a + x)
  const avg1 = sum1 / recorder1.voice.length

  const sum2 = recorder2.voice.reduce((a, x) => a + x)
  const avg2 = sum2 / recorder2.voice.length

  avarageDiffG = avg2 - avg1
  return avarageDiffG
}


const clearVoice = (recorder) => {
  recorder.stop()
  recorder.voice = []
}
import * as Tone from "tone";
import FluteDb5 from "frontend/src/assets/samples/FluteDb5.wav";
import MarimbaG4 from "frontend/src/assets/samples/MarimbaG4.wav";
import GuitarB2 from "frontend/src/assets/samples/GuitarB2.wav";
import BassF2 from "frontend/src/assets/samples/BassF2.wav";
import AltoSaxDb4 from "frontend/src/assets/samples/AltoSaxDb4.wav";
import TubaD3 from "frontend/src/assets/samples/TubaD3.wav";

export const fluteSampler = new Tone.Sampler({
  urls: {
    Db5: FluteDb5,
  },
  release: 1,
}).toDestination();

export const marimbaSampler = new Tone.Sampler({
  urls: {
    G4: MarimbaG4,
  },
  release: 1,
}).toDestination();

export const guitarSampler = new Tone.Sampler({
  urls: {
    B3: GuitarB2,
  },
  release: 1,
}).toDestination();

export const bassSampler = new Tone.Sampler({
  urls: {
    F3: BassF2,
  },
  release: 1,
}).toDestination();

export const altoSaxSampler = new Tone.Sampler({
  urls: {
    Db4: AltoSaxDb4,
  },
  release: 1,
}).toDestination();

export const tubaSampler = new Tone.Sampler({
  urls: {
    D4: TubaD3,
  },
  release: 1,
}).toDestination();

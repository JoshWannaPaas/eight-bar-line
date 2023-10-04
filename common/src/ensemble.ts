import { UserID } from "./users.js";

export enum NoteType {
  ATTACK, 
  SUSTAIN, 
  REST
}

export enum Instrument {
  PERCUSSION,
  FLUTE,
  PIANO,
  TRUMPET,
}

export type Note = {
  type: NoteType;
  /** This is for telling apart when multiple notes overlap the same cell */
  author: UserID;
}

/** THe Eight Bars for a single instrument */
export type BarLine = {
  /** The UUID for storing in a database */
  id: string;
  /** THe author of this particular barline */
  author: UserID;
  /** THe type of instrument this BarLine is for */
  instrument: Instrument;
  /** A grid of 8 rows by 32 columns */
  notes: Note[][];
  /** A list of 32 numbers from 0-1 */
  dynamics: number[];
  /** Scales the entire instrument's volume. Range from 0-1 */
  masterVolume: number;
}

export type Ensemble = {
  /** The ID of the ensemble */
  id: string;
  /** The list of users that were participants in the ensemble */
  authors: UserID[];
  /** The temmpo of the song, range from 0-1 */
  tempo: number;
  /** Each part in the Ensemble, represented by a Bar Line */
  arrangement: BarLine[];
}
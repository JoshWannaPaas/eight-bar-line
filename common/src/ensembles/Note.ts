import { UserID } from "../users.js";

export enum NoteType {
  ATTACK,
  SUSTAIN,
  REST,
}

export enum Instrument {
  // PERCUSSION,
  FLUTE,
  // PIANO,
  // TRUMPET,
  MARIMBA,
  GUITAR,
  BASS,
  ALTO_SAX,
  TUBA,
}

export type Note = {
  type: NoteType;
  /** This is for telling apart when multiple notes overlap the same cell */
  author: UserID;
};

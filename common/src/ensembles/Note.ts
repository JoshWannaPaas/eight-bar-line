import { UserID } from "../users.js";

export enum NoteType {
  ATTACK,
  SUSTAIN,
  REST,
}

/**
 * The instruments will be manually assigned a number. 
 * When we add a new instrument, assign it a number.
 * If we remove an instrument, leave a comment with 
 * the number it used to be. 
 * 
 * This is for backwards compatibility with the database.
 */
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

import { UserID } from "../users.js";
import { Instrument, Note, NoteType } from "./Note.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export enum NoteToggleDirection {
  FORWARD,
  BACKWARD,
}

/** The Eight Bars for a single instrument */
export type BarLineObject = {
  /** The UUID for storing in a database */
  id: string;
  /** The author of this particular barline */
  author: UserID;
  /** The type of instrument this BarLine is for */
  instrument: Instrument;
  /** A grid of 8 rows by 32 columns */
  notes: Note[][];
  /** A list of 32 numbers from 0-1 */
  dynamics: number[];
  /** Scales the entire instrument's volume. Range from 0-1 */
  masterVolume: number;
};

export class BarLine {
  static ROWS = 8;
  static COLS = 32;

  private state: BarLineObject;

  constructor(author: UserID, instrument = Instrument.PIANO) {
    const notes: Note[][] = [];
    for (let r = 0; r < BarLine.ROWS; r++) {
      const row: Note[] = [];
      for (let c = 0; c < BarLine.COLS; c++)
        row.push({ author, type: NoteType.REST });
      notes.push(row);
    }

    const initialState: BarLineObject = {
      id: uuidv4(),
      author,
      instrument,
      dynamics: new Array(BarLine.COLS).fill(0.5),
      masterVolume: 1,
      notes,
    };
    this.state = initialState;
  }

  getAuthor() {
    return this.state.author;
  }

  setInstrument(instrument: Instrument) {
    this.state.instrument = instrument;
  }

  /**
   * Returns true if the given `row` and `col` are in range of 
   * this barline. 
   */
  static inRange (row: number, col: number) {
    if (row < 0 || row > BarLine.ROWS) return false;
    if (col < 0 || col > BarLine.COLS) return false;
    return true;
  }

  getNote(row: number, col: number): Note | undefined {
    if (!BarLine.inRange(row, col)) return undefined;
    return this.state.notes[row][col];
  }

  setNote(row: number, col: number, note: Note) : void{
    if (!BarLine.inRange(row, col)) return;
    this.state.notes[row][col] = note;
  }

  getNoteType (row: number, col: number): NoteType | undefined {
    return this.getNote(row, col)?.type;
  }

  /**
   * Updates the note at the given position according to the following
   * rules. If the note becomes a REST and the next note is a SUSTAIN, 
   * we set that note to ATTACK instead.
   * 
   * Forward Direction: 
   *   REST -> ATTACK -> SUSTAIN (skipped if prev note is REST)
   * Backward Direction:
   *   REST -> SUSTAIN (skipped if prev note is REST) -> ATTACK
   */
  toggleNote (row: number, col: number, direction: NoteToggleDirection) {
    if (!BarLine.inRange(row, col)) return; 
    const note = this.getNote(row, col);
    // Behavior for the Forward Direction
    if (direction === NoteToggleDirection.FORWARD) {
      switch(note.type) {
        case NoteType.REST: {
          note.type = NoteType.ATTACK;
          return;
        }
        case NoteType.ATTACK: {
          const priorNoteType = this.getNoteType(row, col-1);
          const canBecomeSustain = ALLOWED_SUSTAIN_PRECEDENTS.includes(priorNoteType);
          note.type = canBecomeSustain ? NoteType.SUSTAIN : NoteType.REST;
          return;
        }
        case NoteType.SUSTAIN: {
          note.type = NoteType.REST;
          // If the next note was a SUSTAIN, it becomes an ATTACK
          const nextNote = this.getNote(row, col+1);
          if (nextNote === undefined || nextNote.type !== NoteType.SUSTAIN)
            return;
          nextNote.type = NoteType.ATTACK;
          return;
        }
      }
    }

    // Behavior for the Backward Direction
    switch(note.type) {
      case NoteType.REST: {
        const priorNoteType = this.getNoteType(row, col-1);
        const canBecomeSustain = ALLOWED_SUSTAIN_PRECEDENTS.includes(priorNoteType);
        note.type = canBecomeSustain ? NoteType.SUSTAIN : NoteType.ATTACK;
        return;
      }
      case NoteType.ATTACK: {
        note.type = NoteType.REST;
        // If the next note was a SUSTAIN, it becomes an ATTACK
        const nextNote = this.getNote(row, col+1);
        if (nextNote === undefined || nextNote.type !== NoteType.SUSTAIN)
          return;
        nextNote.type = NoteType.ATTACK;
        return;
      }
      case NoteType.SUSTAIN: {
        note.type = NoteType.ATTACK;
        return;
      }
    }
  }

  toObject() {
    return _.cloneDeep(this.state);
  }

  /**
   * @example
   * // The object data
   * const barLineObject = { ... };
   *
   * // Creating the BarLine class from the object
   * const barLine = BarLine.fromObject(barLineObject)
   */
  static fromObject(object: BarLineObject): BarLine {
    const newBarLine = new BarLine(object.author);
    newBarLine.state = _.cloneDeep(object);
    return newBarLine;
  }
}

const ALLOWED_SUSTAIN_PRECEDENTS = [NoteType.ATTACK, NoteType.SUSTAIN];

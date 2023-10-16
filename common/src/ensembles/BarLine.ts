import { UserID } from "../users.js";
import { Instrument, Note, NoteType } from "./Note.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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

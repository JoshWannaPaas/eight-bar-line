import { UserID } from "../users.js";
import { BarLine, BarLineObject } from "./BarLine.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Instrument, NoteType } from "./Note.js";

export type EnsembleObject = {
  /** The ID of the ensemble */
  id: string;
  /** The list of users that were participants in the ensemble */
  authors: UserID[];
  /** The temmpo of the song, range from 0-1 */
  tempo: number;
  /** Each part in the Ensemble, represented by a Bar Line */
  arrangement: BarLineObject[];
};

type EnsembleState = Omit<EnsembleObject, "arrangement"> & {
  arrangement: BarLine[];
};

export class Ensemble {
  private state: EnsembleState;

  constructor() {
    const initialState: EnsembleState = {
      id: uuidv4(),
      authors: [],
      tempo: 0.5,
      arrangement: [],
    };

    this.state = initialState;
    console.log(`Made new Ensemble with ID: ${this.state.id}`);
  }

  hasUser(userId: UserID) {
    return this.state.authors.includes(userId);
  }

  joinRoom(userId: UserID) {
    this.state.authors.push(userId);
    this.state.arrangement.push(new BarLine(userId));
  }

  leaveRoom(userId: UserID) {
    this.state.authors = this.state.authors.filter((e) => e !== userId);
    this.state.arrangement = this.state.arrangement.filter(
      (a) => a.getAuthor() !== userId,
    );
  }

  private getBarLine(userId: UserID) {
    return this.state.arrangement.find(
      (barline) => barline.getAuthor() === userId,
    );
  }

  setInstrument(userId: UserID, instrument: Instrument) {
    const barLine = this.getBarLine(userId);
    /** @todo handle this error better */
    if (barLine === undefined) return;
    barLine.setInstrument(instrument);
  }

  toggleNote(userId: UserID, row: number, col: number) {
    const barLine = this.getBarLine(userId);
    /** @todo handle this error better */
    if (barLine === undefined) return;
    const currentNote = barLine[row][col];
    // Rests always go to Attack
    if (currentNote.type === NoteType.REST) {
      barLine[row][col] = { ...currentNote, type: NoteType.ATTACK };
      return;
    }
    // An attack can become a sustain only if the previous note is an attack or sustain
    if (
      currentNote.type === NoteType.ATTACK &&
      col > 0 &&
      barLine[row][col - 1].type !== NoteType.REST
    ) {
      barLine[row][col] = { ...currentNote, type: NoteType.SUSTAIN };
      return;
    }
    // Otherwise, an attack or a sustain becomes a rest
    barLine[row][col] = { ...currentNote, type: NoteType.REST };
  }

  /**
   * Returns a copy of the list of userIDs
   */
  getMembers() {
    return Array.from(this.state.authors);
  }

  toObject(): EnsembleObject {
    const clone = _.cloneDeep(this.state);
    const nestedClone: EnsembleObject = {
      ...clone,
      arrangement: clone.arrangement.map((barline) => barline.toObject()),
    };
    return nestedClone;
  }

  /**
   * Creates the `Ensemble` class from the `EnsembleObject` representation
   *
   * @example
   * const ensemble = Ensemble.fromObject({
   *   id: "ensemble-id",
   *   authors: ["user-id"],
   *   tempo: 1,
   *   arrangement: [ ... ]
   * });
   */
  static fromObject(object: EnsembleObject) {
    const newEnsemble = new Ensemble();
    newEnsemble.state = {
      ...object,
      arrangement: object.arrangement.map(BarLine.fromObject),
    };
    return newEnsemble;
  }
}

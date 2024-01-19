import { UserID } from "../users.js";
import { BarLine, BarLineObject, NoteToggleDirection } from "./BarLine.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Instrument } from "./Note.js";

/** The Eight Bars for a single instrument */
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

  /**
   * Returns the BarLine that belongs to `userId`. Returns undefined if the
   * user does not have a BarLine.
   *
   * @param userId The user to get the BarLine for
   * @returns The user's respective BarLine
   */
  getBarLine(userId: UserID) {
    return this.state.arrangement.find(
      (barline) => barline.getAuthor() === userId,
    );
  }

  /**
   * Adds the user to the Ensemble and gives them a BarLine. The initial
   * state of the BarLine is determined by the {@link BarLine} constructor.
   *
   * @param userId
   */
  joinRoom(userId: UserID) {
    this.state.authors.push(userId);
    this.state.arrangement.push(new BarLine(userId));
  }

  /**
   * Removes the user and their BarLine from the Ensemble.
   * Does not error if the user is not in the Ensemble.
   *
   * @param userId The user to remove
   */
  leaveRoom(userId: UserID) {
    this.state.authors = this.state.authors.filter((e) => e !== userId);
    this.state.arrangement = this.state.arrangement.filter(
      (a) => a.getAuthor() !== userId,
    );
  }

  /**
   * Sets the instrument of the BarLine that belongs to `userId` to `instrument`.
   *
   * Specifications
   * --------------
   * - Does not care if another user has the same instrument.
   * - See {@link BarLine.setInstrument}
   * @throws if the user does not have a BarLine
   */
  setInstrument(userId: UserID, instrument: Instrument) {
    const barLine = this.getBarLine(userId);
    if (barLine === undefined)
      throw new Error(`User ${userId} does not have a BarLine`);
    barLine.setInstrument(instrument);
  }

  /**
   * Toggles the note at position (`row`, `col`) in the BarLine that belongs to `userId`.
   *
   * Specifications
   * --------------
   * - See {@link BarLine.toggleNote}
   * @throws if the user does not have a BarLine
   */
  toggleNote(
    userId: UserID,
    row: number,
    col: number,
    direction = NoteToggleDirection.FORWARD,
  ) {
    const barLine = this.getBarLine(userId);
    if (barLine === undefined)
      throw new Error(`User ${userId} does not have a BarLine`);
    return barLine.toggleNote(row, col, direction);
  }

  /**
   * Returns the note at position (`row`, `col`) in the BarLine that belongs to `userId`.
   *
   * @throws if the user does not have a BarLine
   */
  getNote(userId: UserID, row: number, col: number) {
    const barLine = this.getBarLine(userId);
    if (barLine === undefined)
      throw new Error(`User ${userId} does not have a BarLine`);
    return barLine.getNote(row, col);
  }

  /**
   * Returns an immutable copy of the list of userIDs
   */
  getMembers(): string[] {
    return Array.from(this.state.authors);
  }

  /**
   * To send the Ensemble between the server and client, we need to convert
   * it to a JSON object. This method converts the Ensemble into a JSON object.
   * To reconstruct the Ensemble, use {@link Ensemble.fromObject}
   *
   * @example
   * const ensemble = new Ensemble();
   * const ensembleObject = ensemble.toObject();
   * // ensembleObject is now a JSON object that can be sent over the network
   * // and then converted back to an Ensemble using Ensemble.fromObject
   */
  toObject(): EnsembleObject {
    const clone = _.cloneDeep(this.state);
    const nestedClone: EnsembleObject = {
      ...clone,
      arrangement: clone.arrangement.map((barline) => barline.toObject()),
    };
    return nestedClone;
  }

  /**
   * Creates the `Ensemble` class from the `EnsembleObject` representation. To
   * generate an `EnsembleObject` from an `Ensemble`, use {@link Ensemble.toObject}
   *
   * @example
   * const ensemble = Ensemble.fromObject({
   *   id: "ensemble-id",
   *   authors: ["user-id"],
   *   tempo: 1,
   *   arrangement: [ ... ]
   * });
   */
  fromObject(object: EnsembleObject) {
    const newEnsemble = new Ensemble();
    newEnsemble.state = {
      ...object,
      arrangement: object.arrangement.map(BarLine.fromObject),
    };
    return newEnsemble;
  }
}

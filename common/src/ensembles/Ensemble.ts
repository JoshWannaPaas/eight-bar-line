import { UserID } from "../users.js";
import { BarLine, BarLineObject } from "./BarLine.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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
  private _state: EnsembleState;

  constructor() {
    const initialState: EnsembleState = {
      id: uuidv4(),
      authors: [],
      tempo: 0.5,
      arrangement: [],
    };

    this._state = initialState;
    console.log(`Made new Ensemble with ID: ${this._state.id}`);
  }

  hasUser(userId: UserID) {
    return this._state.authors.includes(userId);
  }

  joinRoom(userId: UserID) {
    this._state.authors.push(userId);
    this._state.arrangement.push(new BarLine(userId));
  }

  leaveRoom(userId: UserID) {
    this._state.authors = this._state.authors.filter((e) => e !== userId);
    this._state.arrangement = this._state.arrangement.filter(
      (a) => a.getAuthor() !== userId,
    );
  }

  /**
   * Returns a copy of the list of userIDs
   */
  getMembers() {
    return Array.from(this._state.authors);
  }

  toObject(): EnsembleObject {
    const clone = _.cloneDeep(this._state);
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
    newEnsemble._state = {
      ...object,
      arrangement: object.arrangement.map(BarLine.fromObject),
    };
    return newEnsemble;
  }
}

import express from "express";
import Barline from "../models/Barline.js";
import { ReqBody } from "./types.js";
import { Instrument } from "common/dist/index.js";


const barlinesRouter = express.Router();

/**
 * Returns the list of barlines
 *
 * @name GET /api/barlines/
 */
barlinesRouter.get("/", async (req, res) => {
  const barlines = await Barline.findAll();
  res.json(barlines);
});

/**
 * Adds the given barline to the list of barlines
 * 
 * @name POST /api/barlines/
 * 
 * @throws {400} if the author is invalid
 * @throws {400} if the instrument is invalid
 * @throws {500} if the barline could not be created
 */
barlinesRouter.post("/", async (req: ReqBody<PostBarlineReqBody>, res) => {
  if (req.body.author === undefined)
    return res.status(400).send("Invalid author.");
  if (req.body.instrument === undefined)
    return res.status(400).send("Invalid instrument.");

  try {
    const value = await Barline.create({
      author: req.body.author,
      instrument: req.body.instrument,
    });
    return res.json(value.id);
  } catch (e) {
    return res.status(500).send("Unable to create barline.");
  }
});
type PostBarlineReqBody = {
  /** The author of the barline */
  author?: string;
  instrument?: Instrument;
};

export default barlinesRouter;
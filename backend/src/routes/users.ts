// This file contains boiler plate for a REST API
// to add or remove users from the database.
// (The database will be managed in PostgreSQL
// with the `sequelize` library)

import express, { Request } from "express";

// The "Database"
const dummyUsersList: string[] = [];

const usersRouter = express.Router();

/**
 * Returns the list of usernames, separated by commas
 *
 * @name GET /api/users/
 */
usersRouter.get("/", (req, res) => {
  res.json(dummyUsersList.join(", "));
});

/**
 * Adds the given username to the list of users
 *
 * @name POST /api/users/
 *
 * @throws {409} if the username already exists
 */
usersRouter.post("/", (req: Request<{}, {}, PostUserReqBody>, res) => {
  if (dummyUsersList.includes(req.body.username))
    return res
      .status(409)
      .send(`The username "${req.body.username}" already exists.`);
  dummyUsersList.push(req.body.username);
  // Send a success status with the default message ("OK")
  res.sendStatus(200);
});
type PostUserReqBody = {
  /** The name of the user to add */
  username: string;
};

/**
 * Removes the given username from the list of users
 *
 * @name DELETE /api/users/
 *
 * @throws {409} if the username does not exist
 */
usersRouter.delete("/", (req: Request<{}, {}, DeleteUserReqBody>, res) => {
  // Sends an error status with a custom message
  if (!dummyUsersList.includes(req.body.username))
    return res
      .status(409)
      .send(`The username "${req.body.username}" does not exist.`);
  dummyUsersList.splice(dummyUsersList.indexOf(req.body.username));
  res.sendStatus(200);
});
type DeleteUserReqBody = {
  /** The name of the user to delete */
  username: string;
};

export default usersRouter;

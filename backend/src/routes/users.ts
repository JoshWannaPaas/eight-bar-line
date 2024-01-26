// This file contains boiler plate for a REST API
// to add or remove users from the database.
// (The database will be managed in PostgreSQL
// with the `sequelize` library)

import express, { Request } from "express";
import User from "../models/User.js";

type ReqBody<T> = Request<unknown, unknown, T>;

const usersRouter = express.Router();

/**
 * Returns the list of usernames, separated by commas
 *
 * @name GET /api/users/
 */
usersRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  const usernames = users.map((user) => user.username);
  res.json(usernames.join(", "));
});

/**
 * Adds the given username to the list of users
 *
 * @name POST /api/users/
 *
 * @throws {400} if the username is invalid
 * @throws {400} if the password is invalid
 * @throws {409} if the username already exists
 */
usersRouter.post("/", async (req: ReqBody<PostUserReqBody>, res) => {
  if (req.body.username === undefined)
    return res.status(400).send("Invalid username.");
  if (req.body.password === undefined)
    return res.status(400).send("Invalid password.");

  const matchingUser = await User.findOne({
    where: { username: req.body.username },
  });

  if (matchingUser !== null)
    return res
      .status(409)
      .send(`The username "${req.body.username}" already exists.`);
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });
  } catch (e) {
    return res.status(500).send(e);
  }

  // Send a success status with the default message ("OK")
  return res.sendStatus(200);
});
type PostUserReqBody = {
  /** The name of the user to add */
  username: string;
  /** The desired name in plaintext */
  password: string;
};

/**
 * Removes the given username from the list of users
 *
 * @name DELETE /api/users/
 *
 * @throws {401} if the user is not logged in
 * @throws {403} if the user is deleting someone else's account
 * @throws {409} if the username does not exist
 */
usersRouter.delete("/", async (req: ReqBody<DeleteUserReqBody>, res) => {
  // Sends an error status if they are trying to delete an account while not logged in
  if (req.session.username === undefined)
    return res.status(401).send("You are not logged in.");

  // Sends an error if  they are trying to delete someone else's account
  if (req.body.username !== req.session.username)
    return res.status(403).send("You can only delete your own account");

  const { username } = req.body;
  await User.destroy({ where: { username } });

  return res.sendStatus(200);
});
type DeleteUserReqBody = {
  /** The name of the user to delete */
  username: string;
};

/**
 * Allow the user to create a session by logging in with a username and password
 *
 * @name POST /api/users/session/
 *
 *
 * @throws {403} if the user is trying to log in but is already logged in
 */
usersRouter.post("/session/", async (req: ReqBody<PostSessionReqBody>, res) => {
  // Throw an error if they are already logged in.
  if (req.session.username !== undefined)
    return res.status(403).send("You are already signed in.");

  // Throw an error if the login credentials are not correct
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user === null)
    return res.status(400).send("Username or password is incorrect.");

  req.session.username = req.body.username;
  return res.sendStatus(200);
});
type PostSessionReqBody = {
  username: string;
  password: string;
};

/**
 * Allow the user to logout of their session
 *
 * @name DELETE /api/users/session/
 *
 * @throws {401} if the user is not logged in
 */
usersRouter.delete("/session", (req, res) => {
  if (req.session.username)
    return res.status(401).send("Trying to log out while not logged in.");
  req.session.username = undefined;
  return res.sendStatus(200);
});

export default usersRouter;

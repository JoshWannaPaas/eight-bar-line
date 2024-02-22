import { RequestHandler } from "express";

/**
 * Returns true if the given password meets all requirements
 */
export const validateUsername = (username?: string): string | undefined => {
  if (username === undefined) return "'username' is a required field";
  if (username.length < 3) return "Username must be at least 3 characters long";
  if (username.length > 20)
    return "Username must be at most 20 characters long";
  return undefined;
};

/**
 * Returns true if the given password meets all requirements
 */
export const validatePassword = (password?: string): string | undefined => {
  if (password === undefined) return "'password' is a required field";
  if (password.length < 8) return "Password must be at least 8 characters long";
  return undefined;
};

// ======== Express Web Server Middleware ======== //

/**
 * Enforces that a user is logged in before proceeding
 *
 * @throws {401} - If the user is not logged in
 */
export const userIsLoggedIn: RequestHandler = (req, res, next) => {
  if (req.session?.username === undefined)
    return res.status(401).send("You are not logged in");
  return next();
};

/**
 * Enforces that a user is logged out before proceeding
 *
 * @throws {403} - If the user is already logged in
 */
export const userIsNotLoggedIn: RequestHandler = (req, res, next) => {
  if (req.session?.username !== undefined)
    return res.status(403).send("You are already logged in");
  return next();
};

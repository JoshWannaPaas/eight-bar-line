# The Web Sockets Directory

This directory is analogous to the `/backend/src/routes` directory for web sockets instead of an HTTP web server.

## Room Events

The `/rooms.ts` file includes events that operate on joining or leaving a room. This is not a simple HTTP request because we want to ensure that there is an established Web Socket connection and use the `socket.io` notion of rooms for broadcasting events. 

## Ensemble Events

The `/ensemble.ts` file includes events that handle updating the ensemble and broadcasting to everyone in the same room about the change.

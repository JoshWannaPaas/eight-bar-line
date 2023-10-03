# eight-bar-line

Music notation website allowing for custom 8 bars of music to be played with other users.

## Installation
```bash
# Start in the root directory
cd eight-bar-line
# Build the common directory
npm run common
# Install the packages in the root directory
npm install
# Install the packages in the frontend directory
cd frontend
npm install
cd ..
# Install the packages in the backend directory
cd backend
npm install
cd ..
```


## Development

These commands will start the backend and frontend projects and listen to changes in either directory.
```bash
# Start in the root directory
cd eight-bar-line
npm run common
npm run backend
npm run frontend
```

However, this does not listen to changes in the `common` directory automatically. If you want to make changes to the `common` directory, you will need to run:
```bash
# Start in the root directory
cd eight-bar-line
npm run common
```
# The Scripts Directory

The scripts directory will hold a variety of bash scripts to provide development quality of life. 

## `start_db.bash`

This file will automatically handle tearing down the currently running docker (if it exists) and spin up a new blank one. 

It's worth noting that this will wipe the database clean. Any information you had saved previously will be lost. 

The reason for the script is that you cannot start a docker with another one running with the same name. 
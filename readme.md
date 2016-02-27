# dat-server

[![NPM](https://nodei.co/npm/dat-server.png)](https://nodei.co/npm/dat-server/)

Under active development.

```
npm start
```

## Built-in routes

On error:
```
{ "error": true, "message": "the error message goes here.."}
```

### Main screen

GET `/`

Frontend index.html. Lists the currently hosted dats, with stop/start button. Can add a new dat.

### List dats

GET `/dats`

A list of currently deployed dats in JSON format.

Options

- `format`: supply ?format=<ndjson,json,csv> to format the return.

###  Get info for a given dat.

GET `/dats/:name`

Returns:
```
{
  "name": "politicaltweets",
  "link": "dat://thisisalink",
}
```

## Authenticated methods:

Don't worry about it now but at some point we need authentication.

Maybe just http basic auth.

### Start a dat

GET `/dats/:name/start`

Example:

```
curl http://dats.berkeley.edu/dats/mydat/start?link=thisisadathash
```

Could return download progress. (not that important)

```
{ "progress": 30 }
{ "progress": 100 }
{ "progress": 403 }
```

### Stop a dat

GET `/dats/:name/stop`

### Delete a dat

DELETE `/dats/:name`

Delete a dat, removing all data. It's gone. NADA!

Returns `{ deleted: true }` if successful.

## Installation

```
npm install -g dat-manager
```

or, clone from github

```
git clone https://github.com/karissa/dat-manager.git
cd dat manager
npm install
npm start
```

## Deployment

You can set environment variable for `PORT`.

```
$ PORT=50002 dat-manager
Listening on port 50002
```

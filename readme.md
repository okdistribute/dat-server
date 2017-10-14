# dat-server

A web ui and http interface for archiving dats.

![static/example.png](static/example.png)

## Installation

Clone this repository and install dependencies.

```
git clone https://github.com/karissa/dat-server.git
cd dat-server
npm install
```

## Create the config

Copy the example config and change the variables to suit your setup.

```
cp example.config.json config.json
```

* `dir`: Where downloaded dats will be stored.
* `title`: The visible title of the app.

## Build assets and run the app.

```
npm start
```

# API

### List dats

GET `/dats`

A list of currently deployed dats in JSON format.

### Add a dat

POST `/dats`

with json body:
```
{"key": <DAT_KEY>}
```



TODO: Could return download progress.

```
{ "progress": 30 }
{ "progress": 100 }
{ "progress": 403 }
```

### Delete a dat

DELETE `/dats`

with json body:

```
{"key": <DAT_KEY>}
```

Delete a dat, removing all data. They key should be the 64-character string without the `dat://` prefix.

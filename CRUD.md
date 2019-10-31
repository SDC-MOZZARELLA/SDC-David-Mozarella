# CRUDDY API

## CREATE --> /api/photos (POST)

> Post request to /api/photos with proper JSON format { movieId: number, movieName: string, casts: array } will save a new movie document to the db.

## READ --> /api/photos (GET)

> Get request to /api/photos with proper data sent through query -- { id: number } will query database based off id and send cast array

## UPDATE --> /api/photos (PUT)

> Put request to /api/photos with proper data sent through query -- { id: number, movieName: string } will query db to match query params id and update movieName in that document with movieName passed in query params.

## DELETE --> /api/photos (DELETE)

> DELETE request to /api/photos with proper data sent through query -- { id: number } will query db for document matching query id and delete that movie document.

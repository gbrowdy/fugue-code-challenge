# FugueCodeChallenge

To install packages, run `npm install`.

To start server, run `npm start`, and then you can navigate to `localhost:8080`.

# Notes

- I try not to use 3rd party packages in coding challenges. 
In this particular challenge I built my own lazy-loading mechanism for the images.
It's not perfect, but it gets the job done.

- I didn't get around to user messaging, like explicitly telling the user 
if they are right or wrong and how many points they got,
or explaining rules, etc.

- Because this is a small app, I didn't use any Flux data architecture 
or RxJs Observable streams. The lazy loading might have had cleaner code 
if I had used Observables in a separate service.

# Known Issues

- The lazy loading module runs under an implicit assumption that it will finish loading
all the images by the time the user finishes 5 rounds and starts a new game. 
Because of this, there may be visible image loading if a user were to race through the game.

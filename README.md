# Heroes Deck
Card deck of Superheroes

![Heroes Deck Vue app SS](https://i.postimg.cc/jdsQgGqP/Screen-Shot-2019-03-24-at-11-07-32.png "Heroes Deck Vue app")

## Tech
* Vuejs
* Vue Router
* Axios
* Lodash

## API
* https://github.com/akabab/superhero-api

## TODOS

* Add Loading animation during fetching process in Home page for a better UX
* Don't fetch heroes variable and init favoriteHeroes in HeroCardsDeck component, it is destroyed when routing. Fetch happens again, and favoriteHeroes resets.
* Handle state management for heroes and favoriteHeroes variables. Define them in Vue instance so that sub-components can reference it. And fetching will happen only once when the app is mounted.

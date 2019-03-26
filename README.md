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

* ~~Update the main stats at the top right with the total powerstats of favorite heroes~~
* Add Loading animation during fetching process in Home page for a better UX
* ~~Don't fetch heroes variable and init favoriteHeroes in HeroCardsDeck component, it is destroyed when routing. Fetch happens again, and favoriteHeroes resets.~~ (Used vuex store)
* ~~Handle state management for heroes and favoriteHeroes variables. Define them in Vue instance so that sub-components can reference it. And fetching will happen only once when the app is mounted.~~ (Used vuex store)

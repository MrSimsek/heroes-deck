# Heroes Deck
Card deck of Superheroes

[Heroes Deck Vue app SS](https://postimg.cc/p9F8tfTL)

## Tech
* Vuejs
* Vue Router
* Axios
* Lodash

## TODOS

* Add Loading animation during fetching process in Home page for a better UX
* Don't fetch heroes variable in HeroCardsDeck component, it is destroyed when routing and fetches the object again. 
* Handle state management for heroes and favoriteHeroes variables. Define them in Vue instance so that sub-components can reference it. And fetching will happen only once when the app is mounted.

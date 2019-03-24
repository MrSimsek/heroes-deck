# Heroes Deck
Card deck of Superheroes

[url=https://ibb.co/7XXH70v][img]https://i.ibb.co/377wtP1/Screen-Shot-2019-03-24-at-10-50-40.png[/img][/url]

## Tech
* Vuejs
* Vue Router
* Axios
* Lodash

## TODOS

* Add Loading animation during fetching process in Home page for a better UX
* Don't fetch heroes variable in HeroCardsDeck component, it is destroyed when routing and fetches the object again. 
* Handle state management for heroes and favoriteHeroes variables. Define them in Vue instance so that sub-components can reference it. And fetching will happen only once when the app is mounted.

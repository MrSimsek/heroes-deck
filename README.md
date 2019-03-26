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

- [ ] Add Loading animation during fetching process in Home page for a better UX
- [ ] Add favorites filter to cards
- [ ] Add status to all variables
- [x] Don't fetch heroes variable and init favoriteHeroes in HeroCardsDeck component, it is destroyed when routing. Fetch happens again, and favoriteHeroes resets.
- [x] Handle state management for heroes and favoriteHeroes variables with Vuex.
- [x] Update the main stats at the top right with the total powerstats of favorite heroes

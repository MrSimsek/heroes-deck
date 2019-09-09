Vue.config.devtools = true;

const all_heroes_json_url = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json";

Vue.component('input-element', {
	template: '<input class="m-3 mx-auto border-2 rounded-lg p-3 w-3/4 text-gray-darker text-sm focus:outline-none focus:shadow-outline" type="text" :placeholder="setPlaceholder" />',
	props: ['heroName'],
	computed: {
		setPlaceholder() {
			return 'Thoughts about ' + this.heroName + '?';
		}
	}
});

Vue.component('hero-card', {
	props: ['hero'],
	template: `
		<div class="hero relative border-4 rounded-lg w-full m-3 flex flex-col" :class="[{ 'border-orange-500 shadow-lg': hero.favorite === true}]">
			<button @click="upvote(hero)" class="absolute bg-gray-100 py-2 px-4 m-2 border-2 rounded-lg hover:bg-white hover:shadow focus:outline-none focus:shadow-outline">
				👍 {{hero.likes}}
			</button>
			<img class="w-full block mx-auto rounded-t" v-bind:src="hero.images.md" />
			<div id="stats" class="absolute right-0 bg-gray-100 border rounded p-2 m-2">
				<span id="stat__attack" class="stat mr-1" role="img">⚔️ {{hero.powerstats.combat}}</span>
				<span id="stat__defense" class="stat mr-1" role="img">🛡️ {{hero.powerstats.durability}}</span>
				<span id="stat__speed" class="stat mr-1" role="img">⚡ {{hero.powerstats.speed}}</span>
			</div>
			<div class="hero-info p-5">
				<h1 class="mb-3 text-3xl font-semibold">{{hero.name}}</h1>
				<p class="leading-normal">{{hero.bio}}</p>
				<button 
					class="p-3 mt-3 border bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:shadow-outline"
					@click="addToFavorites(hero)">
					<span
						:class="[{ 'hidden': hero.favorite }]">
						<i class="far fa-heart"></i>
						Add to
					</span>
					<span
						:class="[{ 'hidden': !hero.favorite }]">
						<i class="fas fa-heart text-red"></i>
						Remove from
					</span>
					favorites 
					<i class="fa fa-plus-square-o"></i>
				</button>
			</div>
		</div>
	`,
	methods: {
		upvote(hero) {
			this.$store.dispatch('upvote', hero);
		},
		addToFavorites(hero) {
			this.$store.dispatch('addToFavorites', hero);
		}
	}
});

Vue.component('hero-cards-deck', {
	template: `
		<div id="hero-cards-deck" class="flex flex-col justify-center items-center">
			<button @click="shuffleHeroes" class="p-3 m-5 mx-auto rounded bg-black text-white focus:outline-none focus:shadow-outline">
				Shuffle Heroes
			</button>
			<p v-if="favoriteHeroes.length > 0" class="text-xl my-5">
				You have {{favoriteHeroes.length}} favorite 
				<span v-if="favoriteHeroes.length === 1">hero.</span>
				<span v-else>heroes.</span>
			</p>
			<p v-else class="text-xl my-5">
				You don't have any favorite heroes.
			</p>
			<div class="heroes">
				<hero-card 
					v-for="hero in heroes" 
					:key="hero.id"
					:hero="hero"
				></hero-card>
			</div>
		</div>
	`,
	computed: {
		heroes() {
			return this.$store.state.heroes;
		},
		favoriteHeroes() {
			return this.$store.state.favoriteHeroes;
		}
	},
	methods: {
		shuffleHeroes() {
			this.$store.dispatch('shuffle');
		}
	}
});

// Pages
const Home =  {
	template: `
		<div id="home-page" class="h-full">
			<hero-cards-deck></hero-cards-deck>
		</div>
	`
};
const Collections = {
	template: '<div>hey!</div>'
};

// Vue-Router
const routes = [
	{ path: '/', component: Home },
	{ path: '/collections', component: Collections }
];
const router = new VueRouter({
	routes
});

// Vuex
const store = new Vuex.Store({
	state: {
		heroes: null,
		favoriteHeroes: []
	},
	mutations: {
		SET_HEROES: (state, heroes) => state.heroes = heroes,
		UPVOTE_HERO: (state, upvoteHero) => state.heroes.find(hero => hero.name === upvoteHero.name).likes++,
		ADD_TO_FAVORITES: (state, favoriteHero) => {
			const hero = state.heroes.find(hero => hero.name === favoriteHero.name);
			if(hero.favorite) {
				state.favoriteHeroes.splice(state.favoriteHeroes.indexOf(hero.name), 1);
			} else {
				state.favoriteHeroes.push(hero.name);
			}
			hero.favorite = !hero.favorite;
		},
		SHUFFLE_HEROES: state => state.heroes = _.shuffle(state.heroes)
	},
	actions: {
		fetchAllHeroes({ commit }) {
			axios
				.get(all_heroes_json_url)
				.then(response => response.data)
				.then(allHeroes => {
					allHeroes.map(hero => Object.assign(hero, { favorite: false, likes: 0 }));
					commit('SET_HEROES', allHeroes);
				});
		},
		upvote({commit}, upvoteHero) {
			commit('UPVOTE_HERO', upvoteHero);
		},
		addToFavorites({ commit }, favoriteHero) {
			commit('ADD_TO_FAVORITES', favoriteHero);
		},
		shuffle({commit}) {
			commit('SHUFFLE_HEROES');
		}
	}
});

// Vue Instance
const vm = new Vue({
	el: '#app',
	router,
	store,
	data: {
		mainStats: {
			attack: 0,
			defense: 0,
			speed: 0
		}
	},
	mounted () {
		this.$store.dispatch('fetchAllHeroes')
	},
	computed: {
		favoriteHeroes() {
			return this.$store.state.favoriteHeroes;
		}
	},
	watch: {
		favoriteHeroes(oldValue, newValue) {
			this.mainStats.attack = 0;
			this.mainStats.defense = 0;
			this.mainStats.speed = 0;

			this.$store.state.favoriteHeroes.forEach(favoriteHeroName => {
				const hero = this.$store.state.heroes.find(hero => hero.name === favoriteHeroName);
				this.mainStats.attack += hero.powerstats.combat;
				this.mainStats.defense += hero.powerstats.durability;
				this.mainStats.speed += hero.powerstats.speed;
			});
		}
	}
});
Vue.config.devtools = true;

const all_heroes_json_url = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json";

let heasdasdasroes = [
	{
		id: 1,
		name: "Batman",
		image: "https://avatarfiles.alphacoders.com/918/91802.jpg",
		bio: "Unlike most superheroes, Batman does not possess any superpowers; rather, he relies on his genius-level intellect, physical prowess, martial arts abilities, detective skills, science and technology, vast wealth, intimidation, and indomitable will.",
		likes: 12,
		stats: {
			attack: 7,
			defense: 4,
			speed: 6
		},
		favorite: false
	},
	{
		id: 2,
		name: "Superman",
		image: "https://lh3.googleusercontent.com/JuV91B94BijTOwlDybmz8cwxYoVfxs0n9QVbLVxop66APxf_odRLyBr9drIaMvF-BrIrVe-mDk4AcAwDTiw=rw",
		bio: "Superman was born on the planet Krypton and named Kal-El. As a baby, he was sent to Earth in a small spaceship by his scientist father Jor-El moments before Krypton was destroyed in a natural cataclysm.",
		likes: 9,
		stats: {
			attack: 8,
			defense: 7,
			speed: 9
		},
		favorite: false
	},
	{
		id: 3,
		name: "Joker",
		image: "https://steamuserimages-a.akamaihd.net/ugc/87095428621950208/3FD0255EE8F56E6C2CBD9B4D3855CE613CD99E83/",
		bio: "The Joker is a supervillain and the archenemy of Batman. He was first introduced in Batman #1 (Spring 1940) and has remained consistently popular. The Joker is a master criminal with a clown-like appearance, and is considered one of the most infamous criminals within Gotham City.",
		likes: 13,
		stats: {
			attack: 2,
			defense: 3,
			speed: 10
		},
		favorite: false
	},
	{
		id: 4,
		name: "Catwoman",
		image: "https://avatarfiles.alphacoders.com/704/70401.jpg",
		bio: "Selina Kyle, also known as Catwoman, is a fictional character associated with DC Comics' Batman franchise and created by Bill Finger and Bob Kane. Currently portrayed as an orphan who learned to survive on Gotham City's streets, Selina took to thievery to survive... but determined to do it in style, she learned martial arts and trained extensively to perfect her skills in cat burglary. ",
		likes: 13,
		stats: {
			attack: 2,
			defense: 3,
			speed: 10
		},
		favorite: false
	},
	{
		id: 5,
		name: "Harley Quinn",
		image: "https://avatarfiles.alphacoders.com/659/65900.jpg",
		bio: "In her first appearances she was depicted as a character completely devoted to the Joker, totally oblivious to his psychotic nature and obvious lack of affection for her; this characterization has remained more or less consistent throughout her subsequent appearances.",
		likes: 13,
		stats: {
			attack: 2,
			defense: 3,
			speed: 10
		},
		favorite: false
	},
];

Vue.component('input-element', {
	template: '<input class="m-3 mx-auto border-2 rounded-lg p-3 w-3/4 text-grey-darker text-sm focus:outline-none focus:shadow-outline" type="text" :placeholder="setPlaceholder" />',
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
		<div class="hero relative border-4 rounded-lg w-full m-3 flex flex-col" :class="[{ 'border-orange shadow-lg': hero.favorite === true}]">
			<button @click="upvote(hero)" class="absolute bg-grey-lighter py-2 px-4 m-2 border-2 rounded-lg hover:bg-white hover:shadow focus:outline-none focus:shadow-outline">
				👍 
			</button>
			<img class="w-full block mx-auto rounded-t" v-bind:src="hero.images.md" />
			<div id="stats" class="absolute pin-r bg-grey-lighter border rounded p-2 m-2">
				<span id="stat__attack" class="stat mr-1" role="img">⚔️ {{hero.powerstats.combat}}</span>
				<span id="stat__defense" class="stat mr-1" role="img">🛡️ {{hero.powerstats.durability}}</span>
				<span id="stat__speed" class="stat mr-1" role="img">⚡ {{hero.powerstats.speed}}</span>
			</div>
			<div class="hero-info p-5">
				<h1 class="mb-3">{{hero.name}}</h1>
				<p class="leading-normal">{{hero.bio}}</p>
				<a 
					class="p-3 mt-3 border bg-blue text-white rounded cursor-pointer inline-block"
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
				</a>
			</div>
		</div>
	`,
	methods: {
		upvote(hero) {
			hero.likes++;
		},
		addToFavorites(hero) {
			hero.favorite = !hero.favorite;
			const favorites = this.$parent.favoriteHeroes;
			!favorites.includes(hero.name) ? favorites.push(hero.name) : favorites.splice(favorites.indexOf(hero.name), 1);
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
	data() { 
		return {
			heroes: null,
			favoriteHeroes: []
		}
	},
	mounted() {
		axios
			.get(all_heroes_json_url)
			.then(response => {
				response.data.map((hero) => this.addFavoriteProperty(hero));
				this.heroes = response.data;
			});
		
	},
	methods: {
		shuffleHeroes() {
			this.heroes = _.shuffle(this.heroes);
		},
		addFavoriteProperty(object) {
			Object.assign(object, { favorite: false });
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

const routes = [
	{ path: '/', component: Home },
	{ path: '/collections', component: Collections }
];

const router = new VueRouter({
	routes
});

const vm = new Vue({
	el: '#app',
	router,
	data: {
		mainStats: {
			attack: 0,
			defense: 0,
			speed: 0
		}
	}
});
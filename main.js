Vue.config.devtools = true;

let heroes = [
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
];

Vue.component('input-element', {
	props: ['heroName'],
	template: '<input class="m-3 mx-auto border-2 rounded-lg p-3 w-3/4 text-grey-darker text-sm focus:outline-none focus:shadow-outline" type="text" :placeholder="setPlaceholder" />',
	computed: {
		setPlaceholder() {
			return 'Thoughts about ' + this.heroName + '?';
		}
	}
});

Vue.component('hero-card', {
	props: ['hero'],
	template: `
		<div class="hero relative border-4 rounded-lg max-w-sm md:w-1/3 lg:w-1/4 m-3 flex flex-col" :class="[{ 'border-orange shadow-lg': hero.favorite === true}]">
			<button @click="upvote(hero)" class="absolute bg-grey-lighter py-2 px-4 m-2 border-2 rounded-lg hover:bg-white hover:shadow focus:outline-none focus:shadow-outline">
				👍 {{hero.likes}}
			</button>
			<img class="w-full block mx-auto rounded-t" v-bind:src="hero.image" />
			<div id="stats" class="absolute pin-r bg-grey-lighter border rounded p-2 m-2">
				<span id="stat__attack" class="stat mr-1" role="img">⚔️ {{hero.stats.attack}}</span>
				<span id="stat__defense" class="stat mr-1" role="img">🛡️ {{hero.stats.defense}}</span>
				<span id="stat__speed" class="stat mr-1" role="img">⚡ {{hero.stats.speed}}</span>
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

new Vue({
	el: '#app',
	data() { 
		return {
			heroes,
			favoriteHeroes: []
		}
	},
	beforeCreate: function() {
		console.log("beforeCreate");
	},
	created: function() {
		console.log("created");
	},
	beforeMount: function() {
		console.log("beforeMount");
	},
	mounted: function() {
		console.log("mounted");
	},
	beforeUpdate: function() {
		console.log("beforeUpdate");
	},
	updated: function() {
		console.log("updated");
	},
	beforeDestroy: function() {
		console.log("beforeDestroy");
	},
	destroyed: function() {
		console.log("destroyed");
	},
	methods: {
		shuffleHeroes() {
			this.heroes = _.shuffle(this.heroes);
		}
	}
});
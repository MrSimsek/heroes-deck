Vue.config.devtools = true;

let heroes = [
	{
		id: 1,
		name: "Batman",
		image: "https://avatarfiles.alphacoders.com/918/91802.jpg",
		bio: "Unlike most superheroes, Batman does not possess any superpowers; rather, he relies on his genius-level intellect, physical prowess, martial arts abilities, detective skills, science and technology, vast wealth, intimidation, and indomitable will.",
		likes: 12
	},
	{
		id: 2,
		name: "Superman",
		image: "https://lh3.googleusercontent.com/JuV91B94BijTOwlDybmz8cwxYoVfxs0n9QVbLVxop66APxf_odRLyBr9drIaMvF-BrIrVe-mDk4AcAwDTiw=rw",
		bio: "Superman was born on the planet Krypton and named Kal-El. As a baby, he was sent to Earth in a small spaceship by his scientist father Jor-El moments before Krypton was destroyed in a natural cataclysm.",
		likes: 9
	},
	{
		id: 3,
		name: "Joker",
		image: "https://steamuserimages-a.akamaihd.net/ugc/87095428621950208/3FD0255EE8F56E6C2CBD9B4D3855CE613CD99E83/",
		bio: "The Joker is a supervillain and the archenemy of Batman. He was first introduced in Batman #1 (Spring 1940) and has remained consistently popular. The Joker is a master criminal with a clown-like appearance, and is considered one of the most infamous criminals within Gotham City.",
		likes: 13
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
		<div class="hero relative border-4 rounded-lg max-w-sm md:w-1/3 lg:w-1/4 m-3 flex flex-col flex-wrap justify-between" :class="{ 'border-blue': hero.likes >= 20 }">
			<button @click="upvote(hero)" class="absolute bg-grey-lighter py-2 px-4 m-2 border-2 rounded-lg focus:outline-none focus:shadow-outline">
				👍 {{hero.likes}}
			</button>
			<img class="w-full block mx-auto rounded-t" v-bind:src="hero.image" />
			<div class="hero-info p-5">
				<h1 class="mb-3">{{hero.name}}</h1>
				<p class="leading-normal">{{hero.bio}}</p>
			</div>
			<input-element :heroName="hero.name"></input-element>
		</div>
	`,
	methods: {
		upvote(hero) {
			hero.likes++;
		}
	}
});

new Vue({
	el: '#app',
	data: {
		heroes
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
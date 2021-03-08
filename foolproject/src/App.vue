<template>
	<div id="app">
		<div id="filterTags" v-if="selectedArticleData.uuid === undefined">
			<div class="sortSelect">
				<span class="sortText">Sort By:</span>
				<select name="Sort Article By:" id="sortOptions" @change="sortArticles">
				<option value="">--</option>
				<option value="newest">Newest</option>
				<option value="oldest">Oldest</option>
				<option value="alpha">Alphabetical</option>
			</select>
			</div>
			<div class="filterContainer">
				<h3>Filtering By:</h3>
				<ul class="tagWrapper">
					<Tag v-for="(tag, idx) in filterTags"
						:key="'filterTag-' + idx"
						:name="tag.name"
						:slug="tag.slug"
						:filterEvent="removeFilterByTag"
					/>
				</ul>
			</div>
		</div>
		<section id="mainArticleSection">
			<MainArticle
				:article="mainArticleData"
				:articleSelector="selectArticle"
				:selectedArticle="selectedArticleData.uuid !== undefined"
				:filterHandler="filterByTag"
			/>
		</section>
		<section id="articleCardSection">
			<ArticleCard
				v-for="(article, idx) in secondaryArticleData"
				:key="idx"
				:metadata="article"
				:articleSelector="selectArticle"
				:selectedArticle="selectedArticleData.uuid !== undefined"
				:filterHandler="filterByTag"
				/>
		</section>
		<section id="articlePageSection">
			<ArticlePage
				:article="selectedArticle"
				:headlines="headlineData"
				:selectHandler="selectArticle"
				:tickers="selectedTickerData"
				:newTickerHandler="shuffleTickers"
				:backHandler="backToHomepage"
			/>
		</section>
	</div>
</template>

<script>
import MainArticle from "./components/homepage/MainArticle.vue"
import ArticleCard from "./components/homepage/ArticleCard.vue"
import ArticlePage from "./components/articlePage/ArticlePage.vue"
import Tag from "./components/general/Tag"
export default {
  name: 'App',
  components: {
    MainArticle,
    ArticleCard,
    ArticlePage,
	Tag
  },
  data() {
	return {
		articles: {
			main: {},
			secondary: [],
			all: [],
		},
		selectedArticle: {},
		tickers: {
			all: [],
			selected: []
		},
		headlines: [],
		filterTags: [],
		featuredSlug: process.env.VUE_APP_FEATURED_SLUG
    }
  },
  computed: {
    allArticleData: {
		get: function() {
			return this.articles.all
		},
		set: function(articles) {
			this.articles.all = articles
		}
    },
    mainArticleData: {
		get: function() {
			return this.articles.main
		},
		set: function(article) {
			this.articles.main = article
		}
    },
    secondaryArticleData: {
		get: function() {
			return this.articles.secondary
		},
		set: function(articles) {
			this.articles.secondary = articles
		}
    },
	headlineData: {
		get: function() {
			return this.headlines
		},
		set: function(headlines) {
			this.headlines = headlines
		}
	},
	selectedArticleData: {
		get: function() {
			return this.selectedArticle
		},
		set: function(article) {
			this.selectedArticle = article
		}
	},
	filterTagData: {
		get: function() {
			return this.filterTags
		},
		set: function(tags) {
			return this.filterTags = tags
		}
	},
	allTickerData: {
		get: function() {
			return this.tickers.all
		},
		set: function(tickers) {
			this.tickers.all = tickers
		}
	},
	selectedTickerData: {
		get: function() {
			return this.tickers.selected
		},
		set: function(tickers) {
			this.tickers.selected = tickers
		}
	},
	getFeaturedSlug() {
		return this.featuredSlug
	}
  },
  created() {
    this.getData()
  },
  methods: {
	async getData() {
		if (window.location.pathname !== "/") window.history.pushState({path:'/'},'','/');
		const res = await fetch('/content')
		const { results } = await res.json()
		this.allArticleData = results
		const secondaryArticles = []
		const headlineArr = []
		const tickerArr = []
		for (const result of results) {
			if (!this.mainArticleData.uuid && result.tags.some(tag => tag.slug === this.getFeaturedSlug)) this.mainArticleData = result
			else secondaryArticles.push(result)
			headlineArr.push({
				uuid: result.uuid,
				title: result.headline,
				publishedDate: new Date(result.publish_at)
			})
			tickerArr.push(...result.instruments)
		}

		this.allTickerData = Array.from(new Set(tickerArr))
		this.secondaryArticleData = secondaryArticles
		this.headlineData = headlineArr.sort((a, b) => b.publishedDate - a.publishedDate)
	},
	selectArticle(e) {
		const selectedArticle = this.allArticleData.find(article => article.uuid === e.target.dataset.uuid)
		this.selectedArticleData = selectedArticle
		const pathStr = `${selectedArticle.collection.path}/${encodeURI(selectedArticle.headline.replaceAll(" ", "-").toLowerCase())}`
		const tickers = selectedArticle.instruments.slice(0, 3)
		const allTickers = this.allTickerData

		if (tickers.length < 3) {
			const history = {}
			for (const ticker of tickers) {
				history[ticker.instrument_id] = 1
			}

			while (tickers.length < 3) {
				const randomIdx = Math.floor(Math.random() * allTickers.length)
				const ticker = allTickers[randomIdx]
				if (!history[ticker.instrument_id]) tickers.push(ticker)
			} 
		}

		this.selectedTickerData = tickers
		window.history.pushState({path:pathStr},'',pathStr);
		window.scrollTo(0, 0)
	},
	sortArticles(e) {
		let articlesCopy = this.secondaryArticleData.length < 9 ? [this.mainArticleData, ...this.secondaryArticleData] : this.allArticleData.slice()

		if (e.target.value === "newest") articlesCopy.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
		else if (e.target.value === "oldest") articlesCopy.sort((a, b) => new Date(a.publish_at) - new Date(b.publish_at))
		else if (e.target.value === "alpha") articlesCopy.sort((a, b) => a.headline.localeCompare(b.headline))

		this.mainArticleData = {}
		this.secondaryArticleData = []
		const secondaryArticles = []

		for (const article of articlesCopy) {
			if (!this.mainArticleData.uuid && article.tags.some(tag => tag.slug === this.getFeaturedSlug)) this.mainArticleData = article
			else secondaryArticles.push(article)
		}

		this.secondaryArticleData = secondaryArticles
	},
	async filterByTag(e) {
		const history = {}

		for (const tag of this.filterTagData) {
			history[tag.slug] = 1
		}

		if (!history[e.target.dataset.slug]) {
			const {name, slug} = e.target.dataset
			const tagObj = {name, slug}
			const filterTags = [...this.filterTagData, tagObj]
			this.filterTagData = filterTags
			const queryParams = filterTags.map(tag => `tag=${tag.slug}`).join("&")
			const sortOption = document.getElementById("sortOptions").value

			const res = await fetch(`/content?${queryParams}`)
			const { results } = await res.json()

			if (sortOption === "newest") results.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
			else if (sortOption === "oldest") results.sort((a, b) => new Date(a.publish_at) - new Date(b.publish_at))
			else if (sortOption === "alpha") results.sort((a, b) => a.headline.localeCompare(b.headline))


			this.mainArticleData = {}
			this.secondaryArticleData = []
			const secondaryArticles = []

			for (const result of results) {
				if (!this.mainArticleData.uuid && result.tags.some(tag => tag.slug === this.getFeaturedSlug)) this.mainArticleData = result
				else secondaryArticles.push(result)
			}

			this.secondaryArticleData = secondaryArticles
		}
	},
	async removeFilterByTag(e) {
		const {name, slug} = e.target.dataset
		const filterTags = this.filterTagData.filter(filter => 
			name !== filter.name && slug !== filter.slug
		)

		this.filterTagData = filterTags
		const queryParams = filterTags.map(tag => `tag=${tag.slug}`).join("&")
		const sortOption = document.getElementById("sortOptions").value

		const res = await fetch(`/content?${queryParams}`)
		const { results } = await res.json()

		if (sortOption === "newest") results.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
		else if (sortOption === "oldest") results.sort((a, b) => new Date(a.publish_at) - new Date(b.publish_at))
		else if (sortOption === "alpha") results.sort((a, b) => a.headline.localeCompare(b.headline))

		this.mainArticleData = {}
		this.secondaryArticleData = []
		const secondaryArticles = []

		for (const result of results) {
			if (!this.mainArticleData.uuid && result.tags.some(tag => tag.slug === this.getFeaturedSlug)) this.mainArticleData = result
			else secondaryArticles.push(result)
		}

		this.secondaryArticleData = secondaryArticles
	},
	shuffleTickers() {
		const selectedTickers = this.selectedTickerData
		const allTickers = this.allTickerData
		const history = {}
		const newTickers = []

		for (const ticker of selectedTickers) {
			history[ticker.instrument_id] = 1
		}

		while (newTickers.length < 3) {
			const randomIdx = Math.floor(Math.random() * allTickers.length)
			const ticker = allTickers[randomIdx]
			if (!history[ticker.instrument_id]) newTickers.push(ticker)
		}

		this.selectedTickerData = newTickers
	},
	backToHomepage() {
		this.selectedArticleData = {}
		this.selectedTickers = []
	}
  },
}
</script>

<style>
	:root {
		--grey: rgb(241, 244, 254);
		--white: #fff;
	}

	* {
		box-sizing: border-box;
	}

	body, html {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		padding: 0.5rem 1rem;
		background-color: var(--grey);
		font-family: 'Shippori Mincho', serif;
		font-weight: normal
	}

	img {
		width: 100%;
		object-fit: cover;
	}

	ul {
		list-style-type: none;
		padding-left: 0;
	}

	button {
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		font-family: 'Open Sans', sans-serif;
	}

	a {
        cursor: pointer;
    }

	#app {
		max-width: 1440px;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 1.5rem;
	}

	#filterTags {
		background-color: var(--white);
		width: 100%;
	}

	.tagWrapper {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem 0;
	}

	.contentWrapper {
		padding: 1.5rem;
	}

	#mainArticleSection, #articleCardSection {
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		body, html {
			padding: 1.5rem 2rem;
		}

		#articleCardSection {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1.5rem;
			margin-bottom: 0;
		}
	}

	@media (min-width: 1024px) {
		#articleCardSection {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>

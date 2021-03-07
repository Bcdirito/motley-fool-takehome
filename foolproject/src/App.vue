<template>
	<div id="app">
		<section id="mainArticleSection">
			<MainArticle
				:article="mainArticleData"
				:articleSelector="selectArticle"
				:selectedArticle="selectedArticleData.uuid !== undefined"
			/>
		</section>
		<section id="articleCardSection">
			<ArticleCard
				v-for="(article, idx) in secondaryArticleData"
				:key="idx"
				:metadata="article"
				:articleSelector="selectArticle"
				:selectedArticle="selectedArticleData.uuid !== undefined"
				/>
		</section>
		<section id="articlePageSection">
			<ArticlePage
				:article="selectedArticle"
				:headlines="headlineData"
			/>
		</section>
	</div>
</template>

<script>
import MainArticle from "./components/homepage/MainArticle.vue"
import ArticleCard from "./components/homepage/ArticleCard.vue"
import ArticlePage from "./components/articlePage/ArticlePage.vue"

export default {
  name: 'App',
  components: {
    MainArticle,
    ArticleCard,
    ArticlePage
  },
  data() {
	return {
		articles: {
			main: {},
			secondary: [],
			all: []
		},
		featuredArticle: {},
		displayFeatured: true,
		selectedArticle: {},
		tickers: [],
		headlines: []
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
	}
  },
  created() {
    this.getData()
  },
  methods: {
	async getData() {
		const res = await fetch('/content')
		const { results } = await res.json()
		this.allArticleData = results
		const secondaryArticles = []
		const headlineArr = []
		for (const result of results) {
			if (!this.mainArticleData.uuid && result.tags.some(tag => tag.slug === "10-promise")) this.mainArticleData = result
			else secondaryArticles.push(result)
			this.tickers.push(...result.instruments)
			headlineArr.push({
				uuid: result.uuid,
				title: result.headline,
				publishedDate: new Date(result.publish_at)
			})
		}

		this.secondaryArticleData = secondaryArticles
		this.headlineData = headlineArr.sort((a, b) => b.publishedDate - a.publishedDate)
	},
	selectArticle(e) {
		const selectedArticle = this.allArticleData.find(article => article.uuid === e.target.dataset.uuid)
		this.selectedArticleData = selectedArticle
		const pathStr = `/${encodeURI(selectedArticle.headline.replaceAll(" ", "-").toLowerCase())}`
		window.history.pushState({path:pathStr},'',pathStr);
	}
  }
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

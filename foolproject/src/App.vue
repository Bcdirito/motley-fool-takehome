<template>
	<div id="app">
		<div id="filterTags">
			<div class="sortSelect">
				<span class="sortText">Sort By:</span>
				<select name="Sort Article By:" id="sortOptions" @change="sortArticles">
				<option value="non">--</option>
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
		tickers: [],
		headlines: [],
		filterTags: []
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
	},
	sortArticles(e) {
		let articlesCopy = this.secondaryArticleData.length < 9 ? [this.mainArticleData, ...this.secondaryArticleData] : this.allArticleData.slice()

		if (e.target.value === "newest") articlesCopy.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
		else if (e.target.value === "oldest") articlesCopy.sort((a, b) => new Date(a.publish_at) - new Date(b.publish_at))
		else articlesCopy.sort((a, b) => a.headline.localeCompare(b.headline))

		this.mainArticleData = {}
		this.secondaryArticleData = []
		const secondaryArticles = []

		for (const article of articlesCopy) {
			if (!this.mainArticleData.uuid && article.tags.some(tag => tag.slug === "10-promise")) this.mainArticleData = article
			else secondaryArticles.push(article)
		}

		this.secondaryArticleData = secondaryArticles
	},
	async filterByTag(e) {
		const {name, slug} = e.target.dataset
		const tagObj = {name, slug}
		const filterTags = Array.from(new Set([...this.filterTagData, tagObj]))
		this.filterTagData = filterTags
		const queryParams = filterTags.map(tag => `tag=${tag.slug}`).join("&")
		
		const res = await fetch(`/content?${queryParams}`)
		const { results } = await res.json()

		this.mainArticleData = {}
		this.secondaryArticleData = []
		const secondaryArticles = []

		for (const result of results) {
			if (!this.mainArticleData.uuid && result.tags.some(tag => tag.slug === "10-promise")) this.mainArticleData = result
			else secondaryArticles.push(result)
		}

		this.secondaryArticleData = secondaryArticles
	},
	async removeFilterByTag(e) {
		const {name, slug} = e.target.dataset
		const filterTags = this.filterTagData.filter(filter => 
			name !== filter.name && slug !== filter.slug
		)
		this.filterTagData = filterTags
		const queryParams = filterTags.map(tag => `tag=${tag.slug}`).join("&")

		const res = await fetch(`/content?${queryParams}`)
		const { results } = await res.json()

		this.mainArticleData = {}
		this.secondaryArticleData = []
		const secondaryArticles = []

		for (const result of results) {
			if (!this.mainArticleData.uuid && result.tags.some(tag => tag.slug === "10-promise")) this.mainArticleData = result
			else secondaryArticles.push(result)
		}

		this.secondaryArticleData = secondaryArticles
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

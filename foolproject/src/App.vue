<template>
	<div id="app">
		<section id="mainArticleSection">
			<MainArticle
				:article="mainArticleData"
			/>
		</section>
		<section v-if="articleSelected.selected === false" id="articleCardSection">
			<ArticleCard
				v-for="(article, idx) in secondaryArticleData"
				:key="idx"
				:metadata="article"
				/>
		</section>
		<section id="articlePageSection">
			<ArticlePage
				:article="articleSelected.article"
				:headlines="headlineData"
			/>
		</section>
	</div>
</template>

<script>
import MainArticle from "./components/MainArticle.vue"
import ArticleCard from "./components/ArticleCard.vue"
import ArticlePage from "./components/ArticlePage.vue"

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
		articleSelected: {
			selected: false,
			article: {}
		},
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
	}
    // refactor for when article selected getter and setter created
    // mainArticleExists() {
    //   return !this.articleSelected.selected && this.mainArticleData.uuid
    // }
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
		this.articleSelected.article = results[0]
		this.headlineData = headlineArr.sort((a, b) => b.publishedDate - a.publishedDate)
	}
  }
}
</script>

<style>
  #articleCardSection, #mainArticleSection {
    width: 90vw;
    margin: auto;
    margin-bottom: 5%;
  }
</style>

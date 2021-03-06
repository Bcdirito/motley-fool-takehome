<template>
  <div id="app">
    <section v-if="articleSelected.selected === false && Object.keys(mainArticleData).length > 0" id="mainArticleSection">
      <MainArticleTile 
        :article="mainArticleData"
      />
    </section>
    <section v-if="articleSelected.selected === false" id="articleTileSection">
      <ArticleTile
        v-for="(article, idx) in secondaryArticleData"
        :key="idx"
        :metadata="article"
      />
    </section>
  </div>
</template>

<script>
import MainArticleTile from "./components/MainArticleTile.vue"
import ArticleTile from "./components/ArticleTile.vue"
// import ArticleContainer from "./components/"

export default {
  name: 'App',
  components: {
    MainArticleTile,
    ArticleTile
  },
  data() {
    return {
      articles: {
        mainArticle: {},
        secondaryArticles: [],
        allArticles: []
      },
      featuredArticle: {},
      displayFeatured: true,
      articleSelected: {
        selected: false,
        article: {}
      },
      disclosure: null
    }
  },
  computed: {
    allArticleData: {
      get: function() {
        return this.articles.allArticles
      },
      set: function(articles) {
        this.articles.allArticles = articles
      }
    },
    mainArticleData: {
      get: function() {
        return this.articles.mainArticle
      },
      set: function(article) {
        this.articles.mainArticle = article
      }
    },
    secondaryArticleData: {
      get: function() {
        return this.articles.secondaryArticles
      },
      set: function(articles) {
        this.articles.secondaryArticles = articles
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
  #articleTileSection, #mainArticleSection {
    width: 90vw;
    margin: auto;
    margin-bottom: 5%;
  }
</style>

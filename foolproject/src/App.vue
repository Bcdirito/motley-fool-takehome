<template>
  <div id="app">
    <MainArticleTile 
      :msg="this.getDisclosure"
    />
    <ArticleTile
      v-for="(article, idx) in articles"
      :key="idx"
      :metadata="article"
    />
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
      articles: [],
      featuredArticle: {},
      displayFeatured: true,
      disclosure: null
    }
  },
  computed: {
    getArticles() {
      return this.articles
    },
    getDisclosure() {
      return this.disclosure
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.disclosure = this.articles.length !== 0 ? this.articles[0]["disclosure"] : null
  },
  updated() {
    console.log(this.articles)
  },
  methods: {
    async getData() {
      const res = await fetch('/content')
      const { results } = await res.json()
      this.articles = results
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

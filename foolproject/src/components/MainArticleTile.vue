<template>
    <div id="mainArticleContent">
        <section id="mainArticleImage">
            <img class="image" :src="article.images[0].image" />
        </section>
        <section id="mainArticle">
            <span class="tagSpan"
                v-for="(tag) in article.tags"
                :key=tag.uuid
                :slug=tag.slug
            >
                {{ tag.name }}
            </span>
            <h2>{{article.headline}}</h2>
            <p>{{article.promo}}</p>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style>
    #mainArticleContent {
        display: flex;
    }

    #mainArticleImage {
        width: 30%;
        display: inline-flex;
    }

    #mainArticleImage .image {
        width: 100%;
    }

    #mainArticle {
        width: 70%;
        display: inline-flex
    }

    .spanRow {
        display: inline-flex;
        width: 100%;
    }
</style>
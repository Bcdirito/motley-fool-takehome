<template v-if="mainArticleExists">
    <div id="mainArticleContent">
        <section id="mainArticleImage">
            <img class="image" :src="mainImageExists" />
        </section>
        <section id="mainArticle">
            <Tag
                v-for="(tag, idx) in article.tags"
                :key="'mainTag-' + idx"
                :name="tag.name"
                :slug="tag.slug"
            />
            <h2>{{article.headline}}</h2>
            <p>{{article.promo}}</p>
        </section>
    </div>
</template>

<script>
import Tag from "../general/Tag"

export default {
    components: {
        Tag
    },
    props: {
        article: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        mainArticleExists() {
            return this.article.uuid
        },
        mainImageExists() {
            return this.article.uuid ? this.article.images[0].image : ""       
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
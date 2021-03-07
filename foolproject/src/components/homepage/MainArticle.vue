<template v-if="mainArticleExists">
    <div id="mainArticleContent">
        <section id="imageContainer">
            <img class="image" :src="mainImageExists" />
        </section>
        <section class="contentWrapper">
            <ul class="tagWrapper">
                <Tag
                    v-for="(tag, idx) in article.tags"
                    :key="'mainTag-' + idx"
                    :name="tag.name"
                    :slug="tag.slug"
                />
            </ul>
            <h2 :data-uuid="article.uuid" @click="articleSelector">{{article.headline}}</h2>
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
        },
        articleSelector: {
            type: Function
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
        flex-direction: column;
        border: 1px solid rgb(239, 239, 239);
        background-color: var(--white);
    }

    #imageContainer {
        display: flex;
    }

    #imageContainer .image {
        width: 100%;
    }

    .spanRow {
        display: inline-flex;
        width: 100%;
    }

    @media (min-width: 1440px) {
        #imageContainer {
            width: 40%;
        }

        #imageContainer img {
            /* height: 400px; */
        }

        #mainArticleContent {
            flex-direction: row;
        }
    }
</style>
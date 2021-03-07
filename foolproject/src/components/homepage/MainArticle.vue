<template>
    <div id="mainArticleContent" v-if="mainArticleExists && !articleSelected">
        <section id="imageContainer">
            <img class="image" :src="article.images[0].image" />
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
            <a><h2 :data-uuid="article.uuid" @click="articleSelector">{{article.headline}}</h2></a>
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
        },
        selectedArticle: {
            type: Boolean
        }
    },
    computed: {
        mainArticleExists() {
            return this.article.uuid
        },
        articleSelected() {
            return this.selectedArticle
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
<template>
  <div class="articleCard" v-if="!articleSelected">
    <img class="articleCardImage" :src="metadata.images[0].image"/>
    <div class="contentWrapper">
        <ul class="tagWrapper">
        <Tag
            v-for="(tag, idx) in metadata.tags"
            :key="'cardTag-' + idx"
            :name="tag.name"
            :slug="tag.slug"
            :filterEvent="filterHandler"
        />
        </ul>
        <a class="articleCardHeadline"><h3 :data-uuid="metadata.uuid" @click="articleSelector">{{metadata.headline}}</h3></a>
        <p class="cardPromo">{{metadata.promo}}</p>
    </div>
  </div>
</template>

<script>
import Tag from "../general/Tag"

export default {
    components: {
        Tag
    },
    props: {
        metadata: {
            type: Object,
            default: () => {}
        },
        articleSelector: {
            type: Function
        },
        selectedArticle: {
            type: Boolean
        },
        filterHandler: {
            type: Function
        }
    },
    computed: {
        articleSelected() {
            return this.selectedArticle
        }
    }
}
</script>

<style>
    .articleCard {
        margin-bottom: 1rem;
        border: 1px solid rgb(239, 239, 239);
        background-color: var(--white);
    }

    .articleTags {
        display: inline-flex;
        padding-top: 2%;
    }

    .articleCardImage {
        display: none;
    }

    .cardPromo {
        display: none;
    }

    @media (min-width: 768px) {
        .articleCard {
            margin-bottom: 0;
        }
    }

    @media (min-width: 1024px) {
        .articleCardImage {
            display: initial;
        }

        .articleCardImage {
            height: 225px;
        }

        .articleCard .tagWrapper {
            margin-top: 0;
        }
    }

    @media (min-width: 1440px) {
        .cardPromo {
            display: initial
        }

        .articleCardImage {
            height: 355px;
        }
    }
</style>
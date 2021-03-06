<template>
  <div class="articleCard">
    <img class="articleCardImage" :src="metadata.images[0].image"/>
    <div class="articleTags">
        <Tag
            v-for="(tag, idx) in metadata.tags"
            :key="'cardTag-' + idx"
            :name="tag.name"
            :slug="tag.slug"
        />
    </div>
    <p class="articleCardHeadline">{{metadata.headline}}</p>
    {{metadata.promo}}
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
        }
    },
    computed: {
        // articlesExist() {
        //     return this.metadata.length
        // }
    }
}
</script>

<style>
    .articleCard {
        width: 30%;
        display: inline-grid;
        margin-bottom: 5%;
    }

    .articleCardImage{
        width: 100%
        
    }

    .articleTags {
        display: inline-flex;
        padding-top: 2%;
        cursor: pointer;
    }

    .articleCardHeadline {
        cursor: pointer;
        color: blue;
    }

    .articleCardHeadline:hover {
        color: red;
    }
</style>
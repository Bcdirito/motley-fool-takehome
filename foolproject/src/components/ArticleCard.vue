<template>
  <div class="articleCard">
    <img class="articleCardImage" :src="metadata.images[0].image"/>
    <div class="articleTags">
        <span class="tagSpan"
            v-for="(tag) in metadata.tags"
            :key=tag.uuid
            :slug=tag.slug
        >
            {{ tag.name }}
        </span>
    </div>
    <p class="articleCardHeadline">{{metadata.headline}}</p>
    {{metadata.promo}}
  </div>
</template>

<script>
export default {
    props: {
        metadata: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        // artilcesExist() {
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

    .tagSpan {
        background-color: #78C5EF;
        color: white;
        border-radius: 10px;
        padding: 5px
    }

    .articleCardHeadline {
        cursor: pointer;
        color: blue;
    }

    .articleCardHeadline:hover {
        color: red;
    }
</style>
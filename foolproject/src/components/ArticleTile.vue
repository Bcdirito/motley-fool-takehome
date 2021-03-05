<template>
  <div class="articleTile">
    <img class="articleTileImage" :src="metadata.images[0].image"/>
    <div class="articleTags">
        <span class="tagSpan"
            v-for="(tag) in metadata.tags"
            :key=tag.uuid
            :slug=tag.slug
        >
            {{ tag.name }}
        </span>
    </div>
    <p class="articleTileHeadline">{{metadata.headline}}</p>
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
    }
}
</script>

<style>
    .articleTile {
        width: 30%
    }

    .articleTileImage{
        width: 100%
    }

    .tagSpan {
        background-color: #78C5EF;
        color: white;
        border-radius: 10px;
        padding: 5px
    }

    .articleTileHeadline {
        cursor: pointer;
        color: blue;
    }

    .articleTileHeadline:hover {
        color: red;
    }
</style>
<template>
    <div>
        <h3>Recent Headlines:</h3>
        <ul>
            <li v-for="(headline, idx) in filteredHeadlines()"
                :key="'headline-' + idx"
                class="headlineLink"
            >
                <a :data-uuid="headline.uuid">{{headline.title}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        headlines: {
            type: Array,
            default: () => []
        },
        articleUUID: {
            type: String,
            default: ""
        }
    },
    methods: {
        filteredHeadlines() {
            return this.headlines.filter(headline => 
                headline.uuid !== this.articleUUID
            )
        }
    }
}
</script>

<style>
    .headlineLink {
        color: blue;
        margin-bottom: 0.5rem;
        text-decoration: underline;
    }
</style>
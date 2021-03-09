<template>
    <div>
        <h3>Recent Headlines:</h3>
        <ul class="headlinesContainer">
            <li v-for="(headline, idx) in filteredHeadlines()"
                :key="'headline-' + idx"
                class="headlineLink"
            >
                <a :data-uuid="headline.uuid" @click="articleSelector">{{headline.title}}</a>
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
        },
        articleSelector: {
            type: Function,
            default: () => {}
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
    .headlineLink a {
        color: blue;
        text-decoration: underline;
    }

    .headlineLink:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    @media (min-width: 1024px) {
        .headlinesContainer {
            list-style-type: disc;
        }
    }
</style>
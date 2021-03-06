<template>
    <div>
        <h4>Recent Headlines:</h4>
        <ul>
            <li v-for="(headline, idx) in filteredHeadlines()"
                :key="'headline-' + idx"
            >
                {{headline.title}}
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
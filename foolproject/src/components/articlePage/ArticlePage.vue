<template v-if="selectedArticleExists">
    <div>
        <article id="articleContent">
            <Tag 
                v-for="(tag, idx) in article.tags"
                :key="'tag-' + idx"
                :name="tag.name"
                :slug="tag.slug"
            />
            <p class="byline">{{article.byline}} {{generateDateString()}}</p>
            <h2>{{article.headline}}</h2>
            <div v-html="article.body"></div>
            <Ticker
                v-for="(instrument, idx) in article.instruments"
                :key="'instrument-' + idx"
                :company="instrument.company"
                :symbol="instrument.symbol"
            />
            <div>
                <RecentHeadlines 
                    :headlines="headlines"
                    :articleUUID="article.uuid"
                />
            </div>
        </article>
        <hr>
        <section>
            <h3>Comments</h3>
            <textarea name="comments" id="commentsBox" cols="30" rows="10"></textarea>
        </section>
    </div>
</template>

<script>
import Tag from "../general/Tag.vue"
import Ticker from "./Ticker.vue"
import RecentHeadlines from "./RecentHeadlines.vue"

export default {
    components: {
        Tag,
        Ticker,
        RecentHeadlines
    },
    props: {
        article: {
            type: Object,
            default: () => {}
        },
        headlines: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        selectedArticleExists() {
            return this.article.uuid
        }
    },
    methods: {
        generateDateString() {
            const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            const publishedDateObj = new Date(this.article.publish_at)
            const month = monthNames[publishedDateObj.getMonth()]
            const day = publishedDateObj.getDate()
            const fullYear = publishedDateObj.getFullYear()
            
            return `${month} ${day}, ${fullYear}`
        }
    }
}
</script>
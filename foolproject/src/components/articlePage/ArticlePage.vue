<template>
    <div id="articlePage" v-if="selectedArticleExists">
        <article id="articleContent">
            <div class="articleData">
                <span class="xIcon" @click="backHandler">X</span>
                <h1 class="headline">{{article.headline}}</h1>
                <ul class="tagWrapper">
                    <Tag 
                        v-for="(tag, idx) in article.tags"
                        :key="'tag-' + idx"
                        :name="tag.name"
                        :slug="tag.slug"
                    />
                </ul>
                <p class="byline"><img :src="article.authors[0].small_avatar_url" class="authorAvatar" />{{article.byline}} - {{generateDateString()}}</p>
            </div>
            <div id="mainContent">
                <div id="textContent">
                    <div v-html="article.body"/>
                    <div v-html="article.disclosure" class="disclosure"/>
                    <hr class="mobileDivider"/>
                </div>
                <aside v-if="selectedArticleExists" id="tickerHeadlines">
                    <div class="tickerContainer">
                        <Ticker
                            v-for="(instrument, idx) in tickers"
                            :key="'instrument-' + idx"
                            :company="instrument.company_name"
                            :symbol="instrument.symbol"
                        />
                        <button class="newStocksButton" @click="newTickerHandler">Get New Stocks</button>
                    </div>
                    <hr class="asideDivider"/>
                    <div>
                        <RecentHeadlines 
                            :headlines="headlines"
                            :articleUUID="article.uuid"
                            :articleSelector="selectHandler"
                        />
                    </div>
                </aside>
            </div>
        </article>
        <hr>
        <section id="commentsSection">
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
        },
        selectHandler: {
            type: Function,
            default: () => {}
        },
        tickers: {
            type: Array,
            default: () => []
        },
        newTickerHandler: {
            type: Function,
            default: () => {}
        },
        backHandler: {
            type: Function,
            default: () => {}
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

<style>
    #articlePage {
        background-color: var(--white);
        padding: 1rem;
    }

    #articleContent {
        width: 100%;
    }

    .xIcon {
        color: var(--purple);
        font-size: 1.5rem;
        margin: 0;
        cursor: pointer;
    }

    .authorAvatar {
        display: none;
    }

    .headline {
        font-size: 30px;
        font-style: italic;
    }

    .byline {
        font-size: 1rem;
    }

    #articleContent .tagWrapper {
        padding-bottom: 1rem;
    }
    
    #articleContent .tagWrapper .tag {
        cursor: initial;
    }

    .caption, .disclosure {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-style: italic;
    }

    #commentsBox {
        width: 100%
    }

    .newStocksButton {
        background-color: var(--grey);
        padding: 1rem;
        border-radius: 15px;
        border: 2px solid var(--purple);
    }

    @media (min-width: 768px) {
        .xIcon {
            font-size: 2rem;
        }
    }

    @media (min-width: 1024px) {
        .mobileDivider {
            display: none;
        }

        .xIcon {
            font-size: 1.75rem;
        }

        #textContent {
            padding-right: 1.5rem;
        }

        #mainContent {
            display: grid;
            grid-template-columns: 3fr 1fr;
            column-gap: 3rem;
        }

        #tickerHeadlines {
            padding-left: 0.5rem;
        }

        #commentsSection {
            width: 100%;
        }

        .authorAvatar {
            display: inline;
            width: 2rem;
            border-radius: 25px;
            margin-right: 0.5rem;
            padding-left: 4px;
        }

        #commentsBox {
            width: 50%;
        }
    }
</style>
const filterFunctions = {
    articleFilter: (articles, featuredSlug) => {
        const articleData = {
            main: {},
            secondary: []
        }

        for (const article of articles) {
            if (!articleData.main.uuid && article.tags.some(tag => tag.slug === featuredSlug)) articleData.main = article
            else articleData.secondary.push(article)
        }

        return articleData
    },
    allArticleFilter: (articles, featuredSlug) => {
        const articleData = {
            main: {},
            secondary: [],
            headlines: [],
            tickers: []
        }

        for (const article of articles) {
            if (!articleData.main.uuid && article.tags.some(tag => tag.slug === featuredSlug)) articleData.main = article
			else articleData.secondary.push(article)
			articleData.headlines.push({
				uuid: article.uuid,
				title: article.headline,
				publishedDate: new Date(article.publish_at)
			})
			articleData.tickers.push(...article.instruments)
        }

        return articleData
    },
    sortArticles: (articles, sortOption) => {
        if (sortOption === "newest") articles.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
        else if (sortOption === "oldest") articles.sort((a, b) => new Date(a.publish_at) - new Date(b.publish_at))
        else if (sortOption === "alpha") articles.sort((a, b) => a.headline.localeCompare(b.headline))
    }
}

module.exports = filterFunctions
const tickerFunctions = {
    getFullTickers: (selected, all) => {
        const history = getHistoryObj(selected)

        while (selected.length < 3) {
            const randomIdx = Math.floor(Math.random() * all.length)
            const ticker = all[randomIdx]
            if (!history[ticker.instrument_id]) selected.push(ticker)
        } 

        return selected
    },
    shuffleTickers: (selected, all) => {
        const history = getHistoryObj(selected)
        const newTickers = []

        while (newTickers.length < 3) {
			const randomIdx = Math.floor(Math.random() * all.length)
			const ticker = all[randomIdx]
			if (!history[ticker.instrument_id]) newTickers.push(ticker)
		}

        return newTickers
    }
}

const getHistoryObj = (selected) => {
    const history = {}

    for (const ticker of selected) {
        history[ticker.instrument_id] = 1
    }

    return history
}

module.exports = tickerFunctions
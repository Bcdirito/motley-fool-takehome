<template>
    <div class="ticker">
        <span class="chart">📈</span>
        <div class="tickerText">
            <h4 class="companyName">{{company}}</h4>
            <h5 class="tickerData">{{symbol}}</h5>
            <h5 class="tickerData">{{price}}</h5>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        company: {
            Type: String,
            default: ""
        },
        symbol: {
            Type: String,
            default: ""
        },
        price: {
            Type: String,
            default: "$19.49 ($-2.50)"
        }
    }
}
</script>

<style>
    .ticker {
        display: flex;
        border: 2px var(--grey) solid;
        border-radius: 25px;
        margin: 5% 0%;
        gap: 5%;
        padding: 0.25rem;
    }

    .chart {
        font-size: 5.5rem;
    }

    .tickerText {
        vertical-align: middle;
    }

    .companyName {
        margin-bottom: 0.75rem;
    }

    .tickerData {
        margin: 0.75rem 0;
    }
</style>
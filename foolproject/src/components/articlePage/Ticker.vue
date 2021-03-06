<template>
    <div>
        <img src="" alt="Ticker">
        <div>
            <h4>{{company}}</h4>
            <h5>{{symbol}}</h5>
            <h5>{{price}}</h5>
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
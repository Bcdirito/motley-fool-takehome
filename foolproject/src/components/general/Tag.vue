<template>
    <span :data-slug="slug" class="tag">{{ name }}</span>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ""
        },
        slug: {
            type: String,
            default: ""
        }
    }
    
}
</script>

<style>
    .tag {
        background-color: #78C5EF;
        color: white;
        border-radius: 10px;
        padding: 5px
    }
</style>
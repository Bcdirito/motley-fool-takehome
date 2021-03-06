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

</style>
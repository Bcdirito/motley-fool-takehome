<template>
    <li :data-slug="slug" class="tag"><button>{{ name }}</button></li>
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
        background-color: #f2f7fa;
        border-radius: 10px;
        padding: 4px 8px;
    }

    .tag:hover {
        background-color: rgb(198, 209, 241);
    }

    .tag:not(:last-child) {
		margin-right: 0.5rem;
	}
</style>
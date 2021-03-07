<template>
    <li :data-slug="slug" :data-name="name" class="tag" @click="filterEvent">
        {{ name }}
    </li>
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
        },
        filterEvent: {
            type: Function,
            default: () => {}
        }
    }
    
}
</script>

<style>
    .tag {
        background-color: #f2f7fa;
        border-radius: 10px;
        padding: 4px 8px;
        cursor: pointer;
    }

    .tag:hover {
        background-color: rgb(198, 209, 241);
    }

    .tag:not(:last-child) {
		margin-right: 0.5rem;
	}
</style>
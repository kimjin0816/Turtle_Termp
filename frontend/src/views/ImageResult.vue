<template>
    <div class="image-container" style="text-align: center">
        <img :src="item.image" alt="Image Result" style="width: 100%; max-width: 300px; height: auto;" />
        <div class="image-info">
            <h2 v-html="item.title"></h2>
            <a :href="item.link" target="_blank">상품 링크</a>
            <p>{{ item.lprice | formatPrice }}원</p>
            <p>{{ item.category2 }}</p>
            <p>{{ item.category3 }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageResult',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    filters: {
        formatPrice(value) {
            return value;
        },
    },
};
</script>

<style scoped>
</style>
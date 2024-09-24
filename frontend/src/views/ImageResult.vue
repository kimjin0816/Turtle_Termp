<template>
    <div id="image-container">
        <div id="image-box">
            <img class="image" :src="item.image" alt="Image Result" />
        </div>
        <div id="image-title"><span v-html="item.title"></span></div>
        <div id="image-data">
            <div class="image-price">
                <span>{{ item.lprice | formatPrice }}원</span>
            </div>
            <div class="image-category">
                <span>{{ item.category2 }} | {{ item.category3 }}</span>
            </div>
        </div>
        <input type="button" value="상품 링크" @click="goToLink" />
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
            if (!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
    },
    methods: {
        goToLink() {
            window.open(this.item.link, '_blank');
        },
    },
};
</script>

<style scoped>
#image-container {
    display: flex;
    flex-direction: column;
    width: 241.5px;
    height: fit-content;
    margin: 10px;
    margin-bottom: 20px;
}

#image-box {
    flex: 1;
    width: 241.5px;
    height: 241.5px;
}

.image {
    width: 241.5px;
    height: 241.5px;
}

#image-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    height: 80px;
}

#image-title span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
}

#image-data {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.image-price {
    flex: 1;
    align-content: flex-start;
}

.image-price span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
}

.image-category {
    display: flex;
    align-content: flex-end;
}

.image-category span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    align-items: center;
}

input[type=button] {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    height: 48px;
    background: rgb(0, 0, 0);
    color: #ffffff;
}

input[type=button]:hover {
    background: grey;
}
</style>
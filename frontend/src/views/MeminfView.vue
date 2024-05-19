<template>
  <div v-show="showMemin">
    <h1>회원 정보 페이지</h1>
    <!-- 기타 회원 정보 관련 내용 추가 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMemin: true, // 추가: 화면에 보이도록 여부를 관리할 변수
    };
  },
  // 기타 로직 및 메서드 추가
};
</script>

<style scoped>
/* 필요한 스타일을 추가할 수 있습니다. */
</style>
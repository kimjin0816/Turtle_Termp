<template>
  <v-app>
    <!-- 상단 바 -->
    <v-app-bar app color="grey lighten-1" dark style="max-height: 100px">
      <v-row
        style="
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: -10px;
        "
      >
        <div style="color: black; font-size: 36px;">C&C</div>
      </v-row>

        <!-- 메뉴 버튼 -->
        <v-row
          style="display: flex; justify-content: center; align-items: center"
        >
          <v-btn
            @click="goToHome"
            text
            color="black"
            class="ml-1"
            style="text-decoration: underline; font-size: 20px;"
          >
            메인
          </v-btn>
          <v-btn
            @click="goToAbout"
            text
            color="black"
            class="ml-1"
            style="text-decoration: underline; font-size: 20px;"
          >
            키워드
          </v-btn>
          <v-btn
            @click="goToCody"
            text
            color="black"
            class="ml-1"
            style="text-decoration: underline; font-size: 20px;"
          >
            코디
          </v-btn>
        </v-row>

        <!-- 로그인/로그아웃 버튼 -->
        <v-row
          style="display: flex; justify-content: flex-start; margin-top: -10px"
        >
          <v-btn
            @click="handleAuthAction"
            text
            color="black"
            class="ml-1"
            style="font-size: 24px;"
          >
            {{ isAuthenticated ? nickname : "로그인" }}
          </v-btn>
          <v-btn
            v-if="isAuthenticated"
            @click="handleAuthAction"
            text
            color="black"
            class="ml-1"
            style="font-size: 24px;"
          >
            로그아웃
          </v-btn>
        </v-row>

    </v-app-bar>

    <!-- 라우터 뷰 -->
    <v-main>
      <router-view :nickname="nickname" @login-success="handleLoginSuccess" />
    </v-main>

    <!-- 푸터 -->
    <v-footer app color="grey lighten-1" dark>
      <span
        style="
          display: block;
          margin: 0 auto;
          text-align: center;
          background-color: #yourColor;
          color: black;
          padding: 10px;
        "
      >
        2024 목원대학교 졸업작품
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      nickname: "", // 추가: 닉네임을 저장할 변수
      isAuthenticated: false, // 추가: 인증 상태를 저장할 변수
    };
  },
  methods: {
    goToAbout() {
      try {
        // Vue Router를 이용하여 /about 페이지로 이동
        this.$router.push({
          name: "about",
          params: { nickname: this.nickname },
        });
      } catch (error) {
        console.error("Error navigating to /about:", error);
      }
    },
    goToHome() {
      try {
        // Vue Router를 이용하여 홈 페이지로 이동
        this.$router.push({
          name: "home",
          params: { nickname: this.nickname },
        });
      } catch (error) {
        console.error("Error navigating to /home:", error);
      }
    },
    goToCody() {
      try {
        // Vue Router를 이용하여 /cody 페이지로 이동
        this.$router.push({
          name: "cody",
          params: { nickname: this.nickname },
        });
      } catch (error) {
        console.error("Error navigating to /cody:", error);
      }
    },
    async handleAuthAction() {
      if (this.isAuthenticated) {
        // 로그아웃
        try {
          const response = await fetch("http://localhost:3000/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          // 로그아웃 성공 메시지
          alert("로그아웃 성공");
          this.nickname = ""; // 닉네임 지우기
          this.isAuthenticated = false;
          this.$router.push("/"); // 로그아웃 후 홈 화면으로 이동
        } catch (error) {
          console.error("로그아웃 오류:", error);
          alert("서버 오류");
        }
      } else {
        // 로그인 페이지로 이동
        this.$router.push({
          name: "login",
          params: { nickname: this.nickname },
        });
      }
    },
    handleLoginSuccess(nickname) {
      this.nickname = nickname;
      this.isAuthenticated = true;
      this.$router.push({ name: "home" }); // 로그인 성공 시 Home 페이지로 이동
    },
  },
};
</script>

<style>
/* 필요한 스타일을 추가할 수 있습니다. */
</style>
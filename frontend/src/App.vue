<template>
  <v-app>
    <!-- 상단 바 -->
    <v-app-bar app color="grey lighten-1" dark style="max-height: 63px">
      <v-row style="
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: -10px;">
          
        <!-- 새로운 메뉴 버튼 -->
        <div style="margin-right: -70px;">
          <v-btn icon @click="drawer = !drawer" class="custom-btn">
            <v-icon color="black">mdi-menu</v-icon>
            <span class="hidden-sm-and-up">메뉴</span>
          </v-btn>
        </div>
        <div
          style="margin-left: 50px; display: inline-block; margin-right: -100px;"
        >
          <span
            style="color: black; font-size: 36px; position: relative; left: -50px;"
            >C&C</span
          >
        </div>

        <div
          style="margin-left: 100px; display: inline-block ; justify-content: center"
        >
          <span
            style="color: black; font-size: 48px; position: relative; left: 380px;"
            >Clothes By Connect</span
          >
        </div>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
          style="height: calc(100vh - 100px); left: 0; right: auto; z-index: 1000;"
        >
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="light-grey">
              <v-btn
                @click="handleAuthAction"
                text
                color="white"
                class="ml-1"
                style="font-size: 24px; margin-bottom: 40px;"
              >
                {{ isAuthenticated ? nickname : "로그인" }}
              </v-btn>

              <v-list-item @click="goToPage('home')" style="margin-top: 10px;">
                <v-list-item-title>메인</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToPage('about')">
                <v-list-item-title>키워드</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToPage('cody')">
                <v-list-item-title>코디</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
            <v-list nav dense v-if="isAuthenticated" style="margin-top: 400px;">
              <v-btn @click="handleLogout" color="light-grey" dark style="width: 100px;">
                <v-list-item-title style="color: white; font-size: 24px;">로그아웃</v-list-item-title>
              </v-btn>
            </v-list>
          </v-list>
        </v-navigation-drawer>
      </v-row>

      <!-- 메뉴 버튼 -->
      <v-row
        style="
          display: flex;
          align-items: center;
          margin-top: 150px !important;
          justify-content: space-between;
        "
      >
        <v-btn
          @click="goToPage('about')"
          text
          color="black"
          class="ml-1 move-left"
          style="text-decoration: underline; font-size: 20px;"
        >
          키워드
        </v-btn>
        <v-btn
          @click="goToPage('home')"
          text
          color="black"
          class="move-left"
          style="
            text-decoration: underline;
            font-size: 20px;
            margin-right: 20px;
            margin-left: -40px;
          "
        >
          메인
        </v-btn>
        <v-btn
          @click="goToPage('cody')"
          text
          color="black"
          class="ml-1 move-left"
          style="text-decoration: underline; font-size: 20px;"
        >
          코디
        </v-btn>
      </v-row>

      <!-- 로그인/로그아웃 버튼 -->
      <v-row style="display: flex; justify-content: flex-start; margin-top: -10px">
        <v-spacer></v-spacer> <!-- 중요: 여백을 추가하여 오른쪽으로 이동시킵니다. -->
        <!-- 사용자 이름 영역에 v-menu 추가 -->
        <v-menu v-if="isAuthenticated" offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="black" class="ml-1" v-on="on" style="font-size: 24px;">
              {{ nickname }}
            </v-btn>
          </template>

          <v-list style="max-width: 200px">
            <!-- 여기에 소메뉴 항목들을 추가 -->
            <v-list-item @click="handleSubMenuClick('회원 정보')" class="menu-item">
              <v-list-item-title class="menu-title">회원 정보</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleSubMenuClick('추가 예정')" class="menu-item">
              <v-list-item-title class="menu-title">추가 예정</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleSubMenuClick('추가 예정')" class="menu-item">
              <v-list-item-title class="menu-title">추가 예정</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 로그인 버튼 -->
        <v-btn
          v-if="!isAuthenticated"
          @click="handleAuthAction"
          text
          color="black"
          class="ml-1"
          style="font-size: 24px;"
        >
          로그인
        </v-btn>

        <!-- 로그아웃 버튼 -->
        <v-btn
          v-if="isAuthenticated"
          @click="handleLogout"
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
          background-color: grey lighten;
          color: black;
          padding: 10px;
          font-size: 28px;
        "
      >
        2024 목원대학교 졸업작품 (Turtle)
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      nickname: '', // 닉네임을 저장할 변수
      isAuthenticated: false, // 인증 상태를 저장할 변수
      drawer: false, // 네비게이션 드로어 표시 여부
    };
  },

  methods: {
    goToPage(pageName) {
      try {
        if (this.$route.name !== pageName) { // 현재 경로와 이동하려는 경로가 다를 때만 이동
          this.$router.push({
            name: pageName,
            params: { nickname: this.nickname },
          });
        }
      } catch (error) {
        console.error(`Error navigating to /${pageName}:`, error);
      }
    },
    async handleAuthAction() {
      if (this.isAuthenticated) {
        this.handleLogout();
      } else {
        if (this.$route.name !== 'login') { // 현재 경로의 이름과 로그인 페이지 이름이 같지 않을 때만 이동을 수행
          this.$router.push({
            name: 'login',
            params: { nickname: this.nickname },
          });
        }
      }
    },
    handleLoginSuccess(nickname) {
      this.nickname = nickname;
      this.isAuthenticated = true;
      this.$router.push({ name: 'home' }); // 로그인 성공 시 Home 페이지로 이동
    },
    handleSubMenuClick(item) {
      if (item === '회원 정보') {
        this.$router.push({ name: 'Memin' });
      } else {
        alert(`선택한 소메뉴: ${item}`);
      }
    },
    async handleLogout() {
      // 로그아웃 처리
      try {
        await fetch('http://localhost:3000/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 로그아웃 성공 메시지
        alert('로그아웃 성공');
        this.nickname = ''; // 닉네임 지우기
        this.isAuthenticated = false;
        if (this.$route.name !== 'home') { // 현재 경로의 이름과 홈 페이지 이름이 같지 않을 때만 이동을 수행
          this.$router.push('/'); // 로그아웃 후 홈 화면으로 이동
        }
      } catch (error) {
        console.error('로그아웃 오류:', error);
        alert('서버 오류');
      }
    },
    async checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:3000/auth/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { isAuthenticated, nickname } = await response.json();
        this.isAuthenticated = isAuthenticated;
        this.nickname = nickname;
      } catch (error) {
        console.error("로그아웃 오류:", error);
        alert("서버 오류");
      }
    }
  },
  mounted() {
    // 사용자 인증 상태 확인
    /* async checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:3000/auth/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { isAuthenticated, nickname } = await response.json();
        this.isAuthenticated = isAuthenticated;
        this.nickname = nickname;
      } catch (error) {
        console.error("사용자 인증 상태 확인 오류:", error);
      }
    }, */
    // getData()를 3초마다 출력해줘
    // setInterval(() => { this.getData(); }, 3000);
  },
};
</script>

<style scoped>
.custom-btn {
  margin-left: -150px;
}

.move-left {
  margin-right: 170px !important;
  transform: translateX(-100px);
}

.v-app-bar {
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  letter-spacing: -.4px;
  min-width: 1180px;
  margin: 0 auto;
  padding: 0;
  max-width: 1920px;
  position: relative;
  width: 100%;
  height: 100%;
  white-space: nowrap;
}
</style>
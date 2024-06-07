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
            <!-- <span class="hidden-sm-and-up">메뉴</span> -->
          </v-btn>
        </div>
        <div style="margin-left: 50px; display: inline-block; margin-right: -100px;">
          <span style="color: black; font-size: 36px; position: relative; left: -50px;">C&C</span>
        </div>

        <div style="margin-left: 100px; display: inline-block ; justify-content: center">
          <span style="color: black; font-size: 48px; position: relative; left: 310px;">Clothes By Connect</span>
        </div>

        <v-navigation-drawer v-model="drawer" absolute bottom temporary
          style="height: calc(100vh - 100px); left: 0; right: auto; z-index: 1000;">
          <v-list nav dense>
            <v-list-item-group active-class="light-grey">
              <v-btn v-if="!authenticated" @click="goToPage('login')" text color="white" class="ml-1"
                style="font-size: 24px; margin-bottom: 40px;"> 로그인
                <!-- {{ isAuthenticated ? nickname : "로그인" }} -->
              </v-btn>

              <v-list-item @click="goToPage('home')" style="margin-top: 10px;">
                <v-list-item-title>메인</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToPage('about')">
                <v-list-item-title>키워드</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
            <v-list nav dense v-if="authenticated" style="margin-top: 400px;">
              <v-btn @click="handleLogout" color="light-grey" dark style="width: 100px;">
                <v-list-item-title style="color: white; font-size: 24px;">로그아웃</v-list-item-title>
              </v-btn>
            </v-list>
          </v-list>
        </v-navigation-drawer>
      </v-row>

      <!-- 상단 바에 있는 목록 -->
      <v-row style="
          display: flex;
          align-items: center;
          margin-top: 150px !important;
          justify-content: space-between;
        ">
        <v-btn @click="goToPage('about')" text color="black" class="ml-1 move-left"
          style="text-decoration: underline; font-size: 20px;">
          키워드
        </v-btn>
        <v-btn @click="goToPage('home')" text color="black" class="move-left" style="
            text-decoration: underline;
            font-size: 20px;
            margin-right: 20px;
            margin-left: -40px;
          ">
          메인
        </v-btn>
      </v-row>

      <!-- 로그인/로그아웃 버튼 -->
      <v-row style="display: flex; justify-content: flex-start; margin-top: -10px">
        <v-spacer></v-spacer> <!-- 중요: 여백을 추가하여 오른쪽으로 이동시킵니다. -->
        <!-- 사용자 이름 영역에 v-menu 추가 -->
        <v-menu v-if="authenticated" offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="black" class="ml-1" v-on="on" style="font-size: 24px;">
              {{ nickname }}
            </v-btn>
          </template>

          <!-- 여기에 소메뉴 항목들을 추가 -->
          <v-list style="max-width: 200px">
            <v-list-item @click="goToPage('Memin')" class="menu-item">
              <v-list-item-title class="menu-title">회원 정보</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item @click="goToPage('')" class="menu-item">
              <v-list-item-title class="menu-title">추가 예정</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToPage('')" class="menu-item">
              <v-list-item-title class="menu-title">추가 예정</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>

        <!-- 로그인 버튼 -->
        <v-btn v-if="!authenticated" @click="goToPage('login')" text color="black" class="ml-1"
          style="font-size: 24px;">
          로그인
        </v-btn>

        <!-- 로그아웃 버튼 -->
        <v-btn v-if="authenticated" @click="handleLogout" text color="black" class="ml-1" style="font-size: 24px;">
          로그아웃
        </v-btn>
      </v-row>
    </v-app-bar>

    <!-- 라우터 뷰 -->
    <v-main>
      <!-- <router-view :nickname="nickname" @login-success="handleLoginSuccess" /> -->
      <router-view />
    </v-main>

    <!-- 푸터 -->
    <v-footer app color="grey lighten-1" dark>
      <span style="
          display: block;
          margin: 0 auto;
          text-align: center;
          background-color: grey lighten;
          color: black;
          padding: 10px;
          font-size: 28px;
        ">
        2024 목원대학교 졸업작품 (Turtle)
      </span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      nickname: '',
      userId: '',
      // authenticated: sessionStorage.getItem('authenticated') === 'true' || false,
      authenticated: false,
    };
  },

  created() {
    this.checkAuthenticationStatus();
    // this.nickname = localStorage.getItem('nickName');
    // this.authenticated = sessionStorage.getItem('authenticated');
  },

  methods: {
    goToPage(pageName) {
      try {
        if (this.$route.name !== pageName) { // 현재 경로와 이동하려는 경로가 다를 때만 이동
          this.$router.push({
            name: pageName,
            params: { nickname: this.nickname },
          });
          // if (this.$route.name !== 'about') {
          //   this.$router.go();
          // }
        }
      } catch (error) {
        console.error(`Error navigating to /${pageName}:`, error);
      }
    },
      }
    },
      }
</script>
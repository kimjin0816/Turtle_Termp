<template>
  <v-app>
    <!-- 상단 바 -->
    <v-app-bar app color="grey lighten-1" dark style="max-height: 63px">
      <v-row style="display: flex; justify-content: flex-end; align-items: center; margin-top: -10px;">
        <div style="margin-right: -70px;">
          <v-btn icon @click="drawer = !drawer" class="custom-btn">
            <v-icon color="black">mdi-menu</v-icon>
          </v-btn>
        </div>
        <div style="margin-left: 50px; display: inline-block; margin-right: -100px;">
          <span style="color: black; font-size: 36px; position: relative; left: -50px;">C&C</span>
        </div>
        <div style="margin-left: 100px; display: inline-block; justify-content: center">
          <span style="color: black; font-size: 48px; position: relative; left: 300px;">Clothes By Connect</span>
        </div>
        <v-navigation-drawer v-model="drawer" absolute bottom temporary style="height: calc(100vh - 100px); left: 0; right: auto; z-index: 1000;">
          <v-list nav dense>
            <v-list-item-group active-class="light-grey">
              <v-btn v-if="!authenticated" @click="goToPage('login')" text color="white" class="ml-1" style="font-size: 24px; margin-bottom: 40px;"> 로그인 </v-btn>
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
      <v-row style="display: flex; align-items: center; margin-top: 150px !important; justify-content: space-between;">
        <v-btn @click="goToPage('about')" text color="black" class="ml-1 move-left" 
        style="text-decoration: underline; font-size: 20px;"> 
        키워드 
      </v-btn>
        <v-btn @click="goToPage('home')" text color="black" class="move-left" 
        style="text-decoration: underline; font-size: 20px; margin-right: 20px; margin-left: -40px;"> 
        메인 </v-btn>
      </v-row>
      <v-row style="display: flex; justify-content: flex-start; margin-top: -10px">
        <v-spacer></v-spacer>
        <v-menu v-if="authenticated" offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="black" class="ml-1" v-on="on" style="font-size: 24px;">
              {{ nickname }}
            </v-btn>
          </template>
          <v-list style="max-width: 200px">
            <v-list-item @click="handleSubMenuClick('회원 정보')" class="menu-item">
              <v-list-item-title class="menu-title">회원 정보</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-if="!authenticated" @click="goToPage('login')" text color="black" class="ml-1" style="font-size: 24px;">
          로그인
        </v-btn>
        <v-btn v-if="authenticated" @click="handleLogout" text color="black" class="ml-1" style="font-size: 24px;">
          로그아웃
        </v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app color="grey lighten-1" dark>
      <span style="display: block; margin: 0 auto; text-align: center; background-color: grey lighten; color: black; padding: 10px; font-size: 28px;">
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
      authenticated: false,
    };
  },

  created() {
    this.checkAuthenticationStatus();
  },

  methods: {
    goToPage(pageName) {
      try {
        if (this.$route.name !== pageName) {
          this.$router.push({ name: pageName, params: { nickname: this.nickname } });
        }
      } catch (error) {
        console.error(`Error navigating to /${pageName}:`, error);
      }
    },
    async checkAuthenticationStatus() {
      try {
        const response = await this.$axios.get('http://localhost:3000/check-auth', {
          withCredentials: true,
        });
        console.log("checkAuthenticationStatus response: ", response.data);
        if (response.data.authenticated) {
          this.userId = localStorage.setItem('userId', response.data.userId);
          this.authenticated = true;
          this.nickname = response.data.nickName;
        } else {
          localStorage.removeItem('userId');
          this.userId = null;
          this.authenticated = false;
          this.nickname = "";
        }
      } catch (error) {
        console.error('인증 상태 확인 실패:', error);
      }
    },

    async handleLogout() {
      try {
        await this.$axios.post('http://localhost:3000/logout', {}, {
          withCredentials: true,
        });
        console.log('로그아웃 성공');
        alert('로그아웃 성공');
        this.goToPage('login');
        this.$router.go();
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    },
    handleSubMenuClick(item) {
      if (item === '회원 정보') {
        this.$router.push({ name: 'Memin' });
      } else {
        alert(`선택한 소메뉴: ${item}`);
      }
    },
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
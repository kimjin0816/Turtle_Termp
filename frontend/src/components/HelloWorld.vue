<template>
  <v-app>
    <v-app-bar app color="grey lighten-1" dark style="max-height: 63px">
      <v-row style="display: flex; justify-content: flex-end; align-items: center; margin-top: -10px;">
        <div style="margin-left: 50px; display: inline-block; margin-right: -100px;">
          <span style="color: black; font-size: 36px; position: relative; left: -50px;">C&C</span>
        </div>
        <div style="margin-left: 100px; display: inline-block; justify-content: center">
          <span style="color: black; font-size: 48px; position: relative; left: 300px;">Clothes By Connect</span>
        </div>
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
            <v-list-item @click="goToPage('Memin')" class="menu-item">
              <v-list-item-title class="menu-title">회원 정보</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-if="!authenticated" @click="goToPage('login')" text color="black" class="ml-1"
          style="font-size: 24px;">
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
        } else {
          if (pageName == 'about') {
            this.$bus.$emit('openDialog');
          }
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

    // logout
    async handleLogout() {
      try {
        await this.$axios.post('http://localhost:3000/logout', {}, {
          withCredentials: true,
        });
        localStorage.removeItem('keywordArray');
        console.log('로그아웃 성공');
        alert('로그아웃 성공');
        this.goToPage('login');
        this.$router.go();
      } catch (error) {
        console.error('로그아웃 실패:', error);
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
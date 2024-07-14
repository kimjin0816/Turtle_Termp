<template>
  <v-app id="app-bar">
    <v-app-bar app color="grey lighten-2" elevation="0">
      <div class="align_left">
        <img src="../assets/logo_letter.svg" alt="logo" style="width: 50px; height: 50px; margin-left: 5px;" />
      </div>
      <div class="align_center">
        <span>Clothes By Connect</span>
      </div>
      <div class="align_right">
        <v-menu v-if="authenticated" offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="black" class="ml-1" v-on="on" style="font-size: 24px;">
              {{ nickname }}
            </v-btn>
          </template>
          <v-list style="max-width: 200px">
            <v-list-item @click="goToPage('Memin')" class="menu-item">
              <v-list-item-title class="menu-title">검색 기록 확인</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToPage('updateProfile')" class="menu-item">
              <v-list-item-title class="menu-title">회원 정보 수정</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToPage('deleteProfile')" class="menu-item">
              <v-list-item-title class="menu-title">회원 탈퇴</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-if="authenticated" @click="handleLogout" text color="white" class="log_button">
          로그아웃
        </v-btn>
        <v-btn v-if="!authenticated" @click="goToPage('login')" text color="white" class="log_button">
          로그인
        </v-btn>
      </div>
    </v-app-bar>
    <div id="two_function">
    <v-btn @click="goToPage('about')" text class="function" :class="{ 'home-button-active': isKeywordPage }"
      style="margin-right: 200px;">
      <span>키워드</span>
    </v-btn>
    <v-btn @click="goToPage('home')" text class="function" :class="{ 'home-button-active': isHomePage }"
      style="margin-left: 200px;">
      <span>메인</span>
    </v-btn>
    </div>
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
  computed: {
    isHomePage() {
      return this.$route.name === 'home'; 
    },
    isKeywordPage() {
      return this.$route.name === 'about';
    }
  },
  mounted() {
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
        console.log(" checkAuthenticationStatus response: ", response.data);
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
.menu-item{  
    /* Pre_R_16 */
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    align-items: center;
    text-align: center;
    color: #000000;

}
#app-bar {
  display: flex;
  flex-direction: row;
}

.align_left {
  display: flex;
  flex: 1;
  justify-content: flex-start;
}

.align_center {
  display: flex;
  flex: 1;
  justify-content: center;
  font-family: 'KIMM_Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
  color: #000000;
  text-transform: uppercase;
}

.align_right {
  display: flex;
  flex: 1;
  justify-content: end;
}

.log_button {
  font-family: 'KIMM_Bold';
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  background-color: #262626;
}

#two_function {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 75px;
}

.function {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
  text-decoration-line: underline;
  text-decoration-color: rgba(173, 173, 173, 0.854902);
  color: rgba(173, 173, 173, 0.854902);
}

.home-button-active {
  color: black !important;
  font-weight: bold !important;
  text-decoration-line: underline;
  text-decoration-color: black;
}
</style>
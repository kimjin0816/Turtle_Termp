<template>
  <v-app>
    <v-app-bar app color="grey lighten-1" dark style="max-height: 100px;">
      <v-row style="display: flex; justify-content: center; align-items: center; margin-top: -10px;"></v-row>
        <div style="margin-left: auto; padding-right: 100px; display: flex; align-items: center;">
          <span style="color: black;">C&C</span>
        </div>
      
        <v-row style="display: flex; justify-content: center; align-items: center;">
          <v-btn @click="goToHome" text color="black" class="ml-1" style="text-decoration: underline;">
            메인
          </v-btn>
          <v-btn @click="goToAbout" text color="black" class="ml-1" style="text-decoration: underline;">
            키워드
          </v-btn>
          <v-btn @click="goToCody" text color="black" class="ml-1" style="text-decoration: underline;">
            코디
          </v-btn>
        </v-row>

        <v-row style="display: flex; justify-content: flex-start; margin-top: -10px">
          <v-btn @click="goToLogin" text color="black" class="ml-1">
            로그인
          </v-btn>
        </v-row>
    </v-app-bar>

    <v-main>
        <router-view/>
    </v-main>

    <v-footer app color="grey lighten-1" dark>
      <span style="display: block; margin: 0 auto; text-align: center; background-color: #yourColor; color: black; padding: 10px;">
        2024 목원대학교 졸업작품
      </span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goToAbout() {
      try {
        // Vue Router를 이용하여 /about 페이지로 이동
        this.$router.push('/about');
      } catch (error) {
        console.error('Error navigating to /about:', error);
      }
    },
    goToHome() {
      try {
        // Vue Router를 이용하여 홈 페이지로 이동
        this.$router.push('/');
      } catch (error) {
        console.error('Error navigating to /home:', error);
      }
    },
    goToCody() {
      try {
        // Vue Router를 이용하여 /cody 페이지로 이동
        this.$router.push('/cody');
      } catch (error) {
        console.error('Error navigating to /cody:', error);
      }
    },
    goToLogin() {
      try {
        // Vue Router를 이용하여 /login 페이지로 이동
        this.$router.push('/login');
      } catch (error) {
        console.error('Error navigating to /login:', error);
      }
    }
  },
};
</script>
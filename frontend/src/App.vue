<template>
  <v-app>
    <!-- 상단 바 -->
    <v-app-bar app color="grey lighten-1" dark style="max-height: 100px">
      <v-row
        style="
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: -10px;"
      >

        <!-- 새로운 메뉴 버튼 -->
        <div style="margin-right: 170px;">
          <v-btn icon @click="drawer = !drawer" class="custom-btn">
            <v-icon color="black">mdi-menu</v-icon>
            <span class="hidden-sm-and-up">메뉴</span>
          </v-btn>
        </div>
        <div style="margin-left: 50px; display: inline-block;">
          <span style="color: black; font-size: 36px; position: relative; left: -380px;">C&C</span>
        </div>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
          style="height: calc(100vh - 100px);"
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="light-grey"
            >

            <v-btn @click="handleAuthAction" text color="white" class="ml-1" style="font-size: 24px; margin-bottom: 40px;">
              {{ isAuthenticated ? nickname : "로그인" }}
            </v-btn>

            <v-list-item @click="goToHome" style="margin-top: 10px;"> <!-- 수정된 부분 -->
              <v-list-item-title>메인</v-list-item-title>
            </v-list-item>

            <v-list-item @click="goToAbout"> <!-- 수정된 부분 -->
              <v-list-item-title>키워드</v-list-item-title>
            </v-list-item>

            <v-list-item @click="goToCody"> <!-- 수정된 부분 -->
              <v-list-item-title>코디</v-list-item-title>
            </v-list-item>

            <v-list-item @click="goToInformation"> <!-- 수정된 부분 -->
              <v-list-item-title>정보</v-list-item-title>
            </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-row>

        <!-- 메뉴 버튼 -->
        <v-row style="display: flex; align-items: center;">
          <v-btn
            @click="goToAbout"
            text
            color="black"
            class="ml-1 move-left"
            style="text-decoration: underline; font-size: 20px;"
          >
            키워드
          </v-btn>
          <v-btn
            @click="goToHome"
            text
            color="black"
            class="ml-1 move-left"
            style="text-decoration: underline; font-size: 20px; margin-right: 10px;"
          >
            메인
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
              <v-list-item
                @click="handleSubMenuClick('회원 정보')"
                class="menu-item"
              >
                <v-list-item-title class="menu-title"
                  >회원 정보</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                @click="handleSubMenuClick('추가 예정')"
                class="menu-item"
              >
                <v-list-item-title class="menu-title"
                  >추가 예정</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                @click="handleSubMenuClick('추가 예정')"
                class="menu-item"
              >
                <v-list-item-title class="menu-title"
                  >추가 예정</v-list-item-title
                >
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
export default {
  name: "App",
  data() {
    return {
      nickname: "", // 추가: 닉네임을 저장할 변수
      isAuthenticated: false, // 추가: 인증 상태를 저장할 변수
      drawer: false, // 네비게이션 드로어 표시 여부
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
        // Vue Router를 이용하여 코디 페이지로 이동
        this.$router.push({
          name: "cody",
          params: { nickname: this.nickname },
        });
      } catch (error) {
        console.error("Error navigating to /cody:", error);
      }
    },
    goToInformation() {
      try{
        this.$router.push('/information'); // 정보 홈페이지의 경로에 맞게 수정하세요.
      }
      catch (error) {
        console.error("Error navigating to /information:", error);
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
    // 소메뉴 항목 클릭 시 처리하는 메서드
    handleSubMenuClick(item) {
      if (item === "회원 정보") {
        // 정보 수정을 클릭했을 때 <abc.vue>를 보이도록 설정하고 경로 변경
        this.showMemin = true;
        this.$router.push({ name: "Memin" });
      } else {
        alert(`선택한 소메뉴: ${item}`);
      }
    },
    handleLogout() {
      // 로그아웃 처리
      try {
        fetch("http://localhost:3000/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // 로그아웃 성공 메시지
        alert("로그아웃 성공");
        this.nickname = ""; // 닉네임 지우기
        this.isAuthenticated = false;
        this.showAbc = false; // 로그아웃 시 <abc.vue> 감추기
        this.$router.push("/"); // 로그아웃 후 홈 화면으로 이동
      } catch (error) {
        console.error("로그아웃 오류:", error);
        alert("서버 오류");
      }
    }
  },
};
</script>

<style>
.custom-btn {
  margin-left: -250px;
}
</style>
<style scoped>
.move-left {
  margin-right: 100px !important; /* 버튼을 왼쪽으로 이동시키는 스타일 */
}
</style>
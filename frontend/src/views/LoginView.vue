<template>
  <div class="home-container">
    <div class="center-box">
      <!-- 로그인 폼 -->
      <form @submit.prevent="login" class="login-form">
        <p>
          <img src="../assets/logo.svg" alt="logo" style="width: 50px; height: 50px; margin-left: 5px;" />
        <h2>안녕하세요!</h2>
        <h2>CLOTHES BY CONNECT입니다.</h2>
        </p>

        <div class="input_tag">
          <input class="input_log" v-model="username" type="text" id="username" name="username" required
            placeholder="아이디를 입력해주세요" />
          <input class="input_log" v-model="password" type="password" id="password" name="password" required
            placeholder="비밀번호를 입력해주세요." />
          <input type="submit" value="로그인" id="submit" />
        </div>
      </form>
      <div class="router-link">
        <router-link to="/signup">
          <button class="logon_findID" style="justify-content: flex-start;">회원가입</button>
        </router-link>
        <router-link to="/findCredentials">
          <button class="logon_findID" style="justify-content: flex-end;">아이디/비밀번호 찾기</button>
        </router-link>
      </div>

      <!-- 네이버 로그인 버튼 추가 -->
      <button @click="loginWithNaver" class="naver-login-button">
        <img src="../assets/naver_icon.png" width="20" alt="네이버 아이콘" /> &nbsp;
        네이버로 로그인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  methods: {
    async login() {
      const userData = {
        username: this.username,
        password: this.password,
      };
      console.log('Login data:', userData);  // 확인용 로그 추가

      try {
        const response = await this.$axios.post('http://localhost:3000/login', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        localStorage.setItem('userId', response.data.userId);
        alert('로그인 성공');
        this.$router.push("/")
        this.$router.go();
      } catch (error) {
        alert('로그인 실패');
        console.error('Login failed:', error.response.data.error);
      }
    },
    loginWithNaver() {
      window.location.href = "http://localhost:3000/auth/naver";
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
}

.center-box {
  text-align: center;
  background-color: #fff;
  padding: 50px;
}

input {
  background: #F0F0F0;
  width: 10cm;
  padding: 10px;
  margin-bottom: 10px;
  border: none;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.input_tag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input_log {
  padding: 12px 28px;
}

#submit {
  justify-content: center;
  align-items: center;
  padding: 12px 28px;
  background: #262626;
  color: white;
}

#submit:hover {
  background: grey;
}

.router-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: center;
}

.logon_findID {
  flex: 1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-decoration-line: underline;
  color: #262626;
  padding: 0px 110px;
}

.naver-login-button {
  width: 20%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: #1ec800;
  color: white;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  margin-top: 30px;
  border-radius: 15px;
}

.naver-login-button img {
  vertical-align: middle;
  margin-bottom: 3px;

}
</style>
<template>
  <div class="signup-container">
    <h1>회원가입</h1>
    <form @submit.prevent="signup" class="signup-form">
      <div class="id-group">
        <label for="mem_id">아이디</label>
        <div id="loginSource">
          <input v-model="mem_id" type="text" id="mem_id" name="mem_id" ref="idInput" required
            placeholder=" 사용하실 아이디를 입력해주세요." />
          <input type="button" @click="checkId" value="중복확인" />
        </div>
      </div>

      <div class="password-group">
        <label for="mem_password">비밀번호</label>
        <input @input="checkPasswordValidity" v-model="mem_password" type="password" id="mem_password"
          name="mem_password" required placeholder=" 사용하실 비밀번호를 입력해주세요." />
        <div id="password_regular">
          <pre>
영대문자/영소문자, 숫자, 특수문자 중 3종류 이상, 최소 9자 이상
사용 가능 특수문자 : ~ ․! @ # $ % ^ & * ( ) _ - + =  [ ] [ ] | \ ; :‘ “ < > , . ? /
          </pre>
          <img v-if="this.password_possible" src="../assets/check_circle_24dp.svg" alt="check_circle"
            style="width: 20px; height: 20px; margin-left: 230px;" />
          <img v-else src="../assets/info_24dp.svg" alt="info" style="width: 20px; height: 20px; margin-left: 230px;" />
        </div>
      </div>

      <div id="setName">
        <div class="name-group">
          <label for="mem_name">이름</label>
          <input v-model="mem_name" type="text" id="mem_name" name="mem_name" required placeholder=" 이름를 입력해주세요." />
        </div>
        <div class="nick-group">
          <label for="mem_nickname">닉네임</label>
          <input v-model="mem_nickname" type="text" id="mem_nickname" name="mem_nickname" required
            placeholder=" 닉네임를 입력해주세요." />
        </div>
      </div>

      <div class="group">
        <label for="mem_email">이메일</label>
        <input v-model="mem_email" type="email" id="mem_email" name="mem_email" required placeholder=" 이메일를 입력해주세요." />
      </div>

      <div class="group">
        <label for="mem_tel">전화번호</label>
        <input type="text" v-model="contact" id="contact" name="contact" @keyup="getPhoneMask(contact)" required
          placeholder=" 전화번호를 입력해주세요." />
      </div>

      <div class="group">
        <label for="mem_address">주소</label>
        <input v-model="mem_address" type="text" id="mem_address" name="mem_address" required
          placeholder=" 주소를 입력해주세요." />
      </div>

      <button class="logon_btn" type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mem_id: "",
      mem_password: "",
      mem_name: "",
      mem_email: "",
      contact: '',
      model: {
        contact: ''
      },
      mem_nickname: "",
      mem_address: "",

      id_possible: false,
      password_possible: false
    };
  },
  methods: {
    getPhoneMask(val) {
      let res = this.getMask(val)
      this.contact = res
      //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
      this.model.contact = this.contact.replace(/[^0-9]/g, '')
    },

    getMask(phoneNumber) {
      if (!phoneNumber) return phoneNumber
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

      let res = ''
      if (phoneNumber.length < 3) {
        res = phoneNumber
      }
      else {
        if (phoneNumber.substr(0, 2) == '02') {

          if (phoneNumber.length <= 5) {//02-123-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
          }
          else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
          }
          else if (phoneNumber.length > 9) {//02-1234-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
          }

        } else {
          if (phoneNumber.length < 8) {
            res = phoneNumber
          }
          else if (phoneNumber.length == 8) {
            res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
          }
          else if (phoneNumber.length == 9) {
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
          }
          else if (phoneNumber.length == 10) {
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
          }
          else if (phoneNumber.length > 10) { //010-1234-5678
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
          }
        }
      }

      return res
    },
    async checkId() {
      const userId = localStorage.getItem("userId");
      if (this.mem_id == userId) {
        alert("현재 사용중인 아이디입니다.");
      } else if (this.mem_id == "") {
        alert("아이디를 입력해주세요.")
      } else {
        try {
          const response = await this.$axios.post("http://localhost:3000/getProfile", {
            mem_id: this.mem_id,
          });
          if (response.status == 200 && response.data.id_possible) {
            this.id_possible = true;
            // 여기에 아까 그거 넣으면 되겠다.
            alert("사용 가능한 아이디입니다.")
          } else {
            alert("이미 사용중인 아이디입니다.")
            this.$refs.idInput.focus();
          }
        } catch (e) {
          console.error("아이디 중복 확인 오류:", e)
          alert("서버 오류")
        }
      }
    },
    validatePassword(password) {
      const minLength = 9;
      let count = 0;

      // 영대문자, 영소문자, 숫자, 특수문자 정규 표현식
      const upperCase = /[A-Z]/;
      const lowerCase = /[a-z]/;
      const numbers = /[0-9]/;
      const specialChars = /[~․!@#$%^&*()_\-+=\[\]|\\;:‘“<>,.?/]/;

      // 각 종류별 포함 여부 확인
      if (upperCase.test(password)) count++;
      if (lowerCase.test(password)) count++;
      if (numbers.test(password)) count++;
      if (specialChars.test(password)) count++;

      // 길이와 종류 확인
      return password.length >= minLength && count >= 3;
    },
    checkPasswordValidity() {
      this.password_possible = this.validatePassword(this.mem_password);
    },
    async signup() {
      if (this.password_possible && this.id_possible) {
        try {
          const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mem_id: this.mem_id,
              mem_password: this.mem_password,
              mem_name: this.mem_name,
              mem_email: this.mem_email,
              mem_tel: this.contact,
              mem_nickname: this.mem_nickname,
              mem_address: this.mem_address,
            }),
          });

          const result = await response.json();
          alert(result.message);

          if (response.status === 201) {
            this.$router.push("/login");
          }
        } catch (error) {
          console.error("회원가입 오류:", error);
          alert("서버 오류");
        }
      } else {
        if (this.id_possible) {
          alert("비밀번호를 확인해주세요.");
        } else if (this.password_possible) {
          alert("아이디를 확인해주세요.");
        } else {
          alert("아이디와 비밀번호를 확인해주세요.");
        }
      }
    }
  },
};
</script>

<style scoped>
label {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

#loginSource {
  display: flex;
  flex-direction: row;
}

#loginSource input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #F0F0F0;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
}

#loginSource input[type="button"] {
  height: 40px;
  width: 100px;
  padding: 0 15px;
  font-size: 14px;
  margin-left: 10px;
  background: #262626;
  color: white;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}

#password_regular {
  display: flex;
  flex-direction: row;
}

.password-group div>pre {
  width: 357px;
  height: 32px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  margin-bottom: 10px;
  color: #F04949;
  flex: 1;
  justify-content: flex-start;
}

.password-group div>img {
  margin-bottom: 10px;
  flex: 1;
  justify-content: flex-end;
}

#setName {
  display: flex;
  flex-direction: row;
}

#setName .name-group {
  margin-right: 10px;
  width: 50%;
}

#setName .nick-group {
  width: 50%;
}

.signup-container {
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

h1 {
  text-align: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
}

.group {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #F0F0F0;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
}

button {
  color: white;
  border-radius: 3px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  justify-content: center;
  background: #262626;
}

button:hover {
  background-color: grey;
}

.logon_btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #262626;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
}
</style>
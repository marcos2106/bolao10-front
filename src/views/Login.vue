<template>
	<div class="logon fundoImg">
		<div class="wrapper fadeInDown">
			<div id="formContent">
				<!-- Icon -->
				<div class="fadeInDown2 first mt--4 mb-2">
					<img src="/img/logo.png" width="140" />
				</div>
				<!-- Login Form -->
				<form>
				<input type="text" id="login" class="fadeIn second" placeholder="E-mail" v-model="login" @keypress.enter="loginAction">
				<input type="password" id="password" maxlength="8" class="fadeIn third" placeholder="Senha" v-model="passwd" @keypress.enter="loginAction">
				<input type="button" class="fadeIn fourth mt-3" value="Acessar" @keyup.enter.native="loginAction" @click="loginAction">
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'logon',
	created(){
		//redirect to https ambiance
		/*
		if(location.href.indexOf("localhost") < 0 && location.href.indexOf("https") < 0 && location.href.indexOf("192.168.0.11") < 0){
			location.href = location.href.replace("http","https");
		}
		*/
	},
	data() {
		return {
			login : '',
			passwd : ''
		}
	},
	methods : {
		loginAction() {
			if (this.invalidoForm()) {
				return;
			}
			this.$clubApi.post('/user/login', {
				login: this.login,
				password: this.passwd
			})
			.then((response) => {
				if (response.data.object.indexOf("primeiro") >= 0) {
					let usuario = response.data.object.split("$");
					localStorage.setItem("id", usuario[1]);
					setTimeout(() => {
						location.href = '/trocarsenha'
					}, 3000);	
					this.$notify({type: 'warning', message: 'É necessário trocar a senha no primeiro acesso!'})				
				} else {
					localStorage.setItem("token", response.data.object);
					location.href = '/'
				}
			}) .catch(() => {
				this.$notify({type: 'warning', message: 'Login ou senha inválido!'})
			}).finally(() =>{
				NProgress.done() 
			})
		},
		invalidoForm() {
			if (this.login == "") {
				this.$notify({type: 'warning', message: 'E-mail não preenchido!'})
				return true;
			}
			if (this.passwd == "") {
				this.$notify({type: 'warning', message: 'Senha não preenchida!'})
				return true;
			}
			return false;
		}
	}
}
</script>

<style scoped>
/* BASIC */

.fundoImg {
	background-image: url("/img/fundologin.png");
	background-repeat: no-repeat;
	background-position: center bottom;
	height: 90vh;
}

html {
	background-color: #4BC5A8;
}

body {
	font-family: "Poppins", sans-serif;
	height: 100vh;
}

a {
	color: #999;
	display:inline-block;
	text-decoration: none;
	font-weight: 400;
}

h2 {
	text-align: center;
	font-size: 16px;
	font-weight: 600;
	text-transform: uppercase;
	display:inline-block;
	margin: 40px 8px 10px 8px; 
	color: #cccccc;
}

.wrapper {
	display: flex;
	align-items: center;
	flex-direction: column; 
	justify-content: center;
	width: 100%;
	min-height: 100%;
	padding: 10px;
}

#formContent {
	-webkit-border-radius: 10px 10px 10px 10px;
	border-radius: 10px 10px 10px 10px;
	background: #fff;
	padding: 30px;
	width: 90%;
	max-width: 450px;
	position: relative;
	padding: 0px;
	-webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
	box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
	text-align: center;
}

#formFooter {
	background-color: #f6f6f6;
	border-top: 1px solid #dce8f1;
	padding: 25px;
	text-align: center;
	-webkit-border-radius: 0 0 10px 10px;
	border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
	color: #cccccc;
}

h2.active {
	color: #0d0d0d;
	border-bottom: 2px solid #4BC5A8;
}

/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
	background-color: #4BC5A8;
	border: none;
	color: white;
	padding: 15px 80px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	text-transform: uppercase;
	font-size: 13px;
	-webkit-box-shadow: 0 10px 30px 0 rgba(106, 233, 169, 0.4);
	box-shadow: 0 10px 30px 0 rgba(130, 214, 189, 0.4);
	-webkit-border-radius: 5px 5px 5px 5px;
	border-radius: 5px 5px 5px 5px;
	margin: 5px 20px 40px 20px;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
	background-color: #79e0c6;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
	-moz-transform: scale(0.95);
	-webkit-transform: scale(0.95);
	-o-transform: scale(0.95);
	-ms-transform: scale(0.95);
	transform: scale(0.95);
}

input[type=text], [type=password] {
	background-color: #f6f6f6;
	border: none;
	color: #0d0d0d;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 5px;
	width: 85%;
	border: 2px solid #f6f6f6;
	-webkit-transition: all 0.5s ease-in-out;
	-moz-transition: all 0.5s ease-in-out;
	-ms-transition: all 0.5s ease-in-out;
	-o-transition: all 0.5s ease-in-out;
	transition: all 0.5s ease-in-out;
	-webkit-border-radius: 5px 5px 5px 5px;
	border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus, [type=password]:focus {
	background-color: #fff;
	border-bottom: 2px solid #4BC5A8;
}

input[type=text]:placeholder {
	color: #cccccc;
}

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
	-webkit-animation-name: fadeInDown;
	animation-name: fadeInDown;
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.fadeInDown2 {
	-webkit-animation-name: fadeInDown;
	animation-name: fadeInDown;
	-webkit-animation-duration: 3s;
	animation-duration: 3s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}

/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>


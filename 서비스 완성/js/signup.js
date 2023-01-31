//입력값의 유효성 검사 

//이메일의 입력값이 유효한가?
const Inputemail = document.getElementById("email");
Inputemail.addEventListener("input",isValidEmail);
const emailMessage = document.querySelector("div.email-message");

//비밀번호 형식 검사
const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input",isValidPassword);

//비밀번호 확인
const inputPasswordConfirm = document.getElementById("password-confirm");
const passwordConfirmMessage = document.querySelector("div.password-confirm-message");
inputPasswordConfirm.addEventListener("input",isValidPasswordConfirm);

//닉네임 확인 
const inputnickname = document.getElementById("nickname");
inputnickname.addEventListener("input",isValidNickname);
const nicknameMessage = document.querySelector("div.nickname-message");


//닉네임 확인
function isValidNickname(event){
    const currentNickname = inputnickname.value;
    if(currentNickname.length < 2 || currentNickname.length > 10){
        nicknameMessage.style.visibility="visible";
        return false;
        
    };
    nicknameMessage.style.visibility="hidden";
    return true;
}
//비밀 번호 확인
function isValidPasswordConfirm(event){
    const currentPassword = inputPassword.value;

    const currentPasswordConfirm = inputPasswordConfirm.value;

    if(currentPassword !== currentPasswordConfirm){
        passwordConfirmMessage.style.visibility="visible";
        return false;
    }
    passwordConfirmMessage.style.visibility="hidden";
        return true;
}
//비밀번호 형식 검사
function isValidPassword(event){
    const currentPassword = inputPassword.value;

    const passwordReg = /^[A-Za-z0-9]{8,20}$/;

    if(!passwordReg.test(currentPassword)){
        passwordMessage.style.visibility="visible";
        return false;
    }
    passwordMessage.style.visibility="hidden";
    return true;
}
//이메일 형식 검사
function isValidEmail(event){
    const currentEmail = Inputemail.value;
    

    const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일 정규식


    if(!emailReg.test(currentEmail)){
        emailMessage.style.visibility = "visible";
        return false;
    }
    emailMessage.style.visibility = "hidden";
    return true;
}

//회원 가입 API
const buttonSignup=document.getElementById("signup");
buttonSignup.addEventListener("click",signup);

function signup(event){
    const isValidRequest = isValidEmail() && isValidPassword() && isValidPasswordConfirm() && isValidNickname();

    console.log(isValidRequest);
}
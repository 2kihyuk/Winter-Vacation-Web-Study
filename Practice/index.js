let target= document.querySelector("#dynamic");
//dynamic이라는 id 속성값을 가진 문서객체를 선택해라.
let stringArr = ["Learn to HTML","Learn to CSS",
"Learn to JAVASCRIPT","Learn to JAVA",
"Learn to PYTHON"];

let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
let selectStringArr = selectString.split("");

function randomString(){
    let stringArr = ["Learn to HTML","Learn to CSS","Learn to JAVASCRIPT","Learn to JAVA","Learn to PYTHON"];

let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
let selectStringArr = selectString.split("");

return selectStringArr;
}

//타이핑 리셋
function resetTyping(){
    target.textContent="";
    dynamic(randomString());
}

//한글자씩 텍스트 출력 함수
function dynamic(randomArr){
    if(randomArr.length>0){
        target.textContent += randomArr.shift();
        setTimeout(function(){
            dynamic(randomArr);
        },80);
    }else{
        setTimeout(resetTyping,3000);
    }
    
    }
    
dynamic(randomString());


//커서 깜빡임 효과
function blink(){
    target.classList.toggle("active");
}

setInterval(blink,500);



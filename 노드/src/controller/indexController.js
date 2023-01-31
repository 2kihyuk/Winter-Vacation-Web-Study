const indexDao = require("../dao/indexDao");

//create 생성 기능 구현
 exports.createTodo = async function(req,res){
    const {userIdx} = req.verifiedToken;
const {  contents, type } = req.body;

if(!userIdx || !contents || !type){
    return res.send({
        isSuccess: false,
        code:400,
        message:"입력값이 누락되었습니다."
    });
}

//contents 20글자 초과 불가
if(contents.length>20){
    return res.send({
        isSuccess: false,
        code:400,
        message:"컨텐츠는 20글자 이하로 설정해주세요."
    });
}
//type: do,decide,delete,delegate 
const validTypes = ["do","decide","delete","delegate"];
if(!validTypes.includes(type)){
    return res.send({
        isSuccess: false,
        code:400,
        message:"유효한 타입이 아닙니다."
    });
}
const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);

if(!insertTodoRow){
    return res.send({
        isSuccess: false,
        code:403,
        message:"요청에 실패 했습니다. 관리자에게 문의해주세요."
    });
}

return res.send({
    isSuccess: true,
    code:200,
    message:"일정 생성 성공"
});

};

//read 조회 기능 구현
exports.readTodo = async function(req,res){
    const {userIdx} =req.verifiedToken;
    const types = ["do","decide","delegate","delete"];
    const todos={};

    for(let type of types){
        let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx,type);

        if(!selectTodoByTypeRows){
            return res.send({
                isSuccess: false,
                code:400,
                message:"일정 조회 실패. 관리자에게 문의해주세요."
            });
        }
        todos[type] = selectTodoByTypeRows
    }
    return res.send({
        result: todos,
        isSuccess: true,
        code:200,
        message:"일정 조회 성공"
    });

    
    return res.send(todos);
};

//수정 update 기능 구현
exports.updateTodo = async function(req,res){
let {  todoIdx, contents,status} = req.body;
const {userIdx} = req.verifiedToken;
//userIdx, todoIdx 는 필수
if(!userIdx || !todoIdx){
    return res.send({
       
        isSuccess: false,
        code:400,
        message:"userIdx 와 todoIdx 를 보내주세요."
    });
}
if(!contents ){
    contents= null;
}
if(!status){
    status=null;
}

const isValidTodoRow = await indexDao.selectValidTodo(userIdx,todoIdx);

if(isValidTodoRow.length<1){
    return res.send({
       
        isSuccess: false,
        code:400,
        message:"유효한 요청이 아닙니다. userIdx 와 todoIdx 를 확인하세요."
    }); 
}

const updateTodoRow =await indexDao.updateTodo(userIdx,todoIdx,contents,status); 

return res.send({
       
    isSuccess: true,
    code:200,
    message:"수정 성공."
}); 
}
exports.deleteTodo = async function(req,res){
    const {todoIdx} =req.params;
    const {userIdx} =req.verifiedToken;
    
    if( !userIdx || !todoIdx ){
        return res.send({
       
            isSuccess: false,
            code:400,
            message:"userIdx 와 todoIdx 를 입력하세요."
        }); 
    }

    const isValidTodoRow = await indexDao.selectValidTodo(userIdx,todoIdx);

if(isValidTodoRow.length<1){
    return res.send({
       
        isSuccess: false,
        code:400,
        message:"유효한 요청이 아닙니다. userIdx 와 todoIdx 를 확인하세요."
    }); 
}

const deleteTodoRow = await indexDao.deleteTodo(userIdx,todoIdx);

if(!deleteTodoRow){
    return res.send({
       
        isSuccess: false,
        code:400,
        message:"삭제 실패 . 관리자에게 문의해주세요"
    }); 
}
return res.send({
       
    isSuccess: true,
    code:200,
    message:"삭제 성공"
}); 
};


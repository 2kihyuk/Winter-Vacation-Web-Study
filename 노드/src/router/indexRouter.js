const indexController = require("../controller/indexController");

const {jwtMiddleware } = require("../../jwtMiddleware");

exports.indexRouter = function(app){
//일정 CRUD API
app.post("/todo",jwtMiddleware,indexController.createTodo) //create

app.get("/todos",jwtMiddleware,indexController.readTodo)//read ... user/1/todos -> 1번 유저의 일정을 조회하려고한다.
app.patch("/todo",jwtMiddleware, indexController.updateTodo) //update 수정하기

app.delete("/todo/:todoIdx",jwtMiddleware,indexController.deleteTodo) //delete , /user/1/todo/1 1번유저 1번 todo 삭제
};


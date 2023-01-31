const {pool} = require("../../database");

exports.getUserRows =async function(){
    try{
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const selectUserQuery= "SELECT * FROM Users;";
            const [row] =await connection.query(selectUserQuery);
            
            
            return row;
        } catch(err){
            console.error("query error");
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("err");
        return false;
    }
};




exports.insertTodo = async function(userIdx, contents, type){
    try{
        //쿼리
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const insertTodoQuery= "insert into Todos (userIdx,contents,type) values (?,?,?);";
            const insertTodoParams = [userIdx,contents,type];
            const [row] =await connection.query(insertTodoQuery,insertTodoParams);
            
            
            return row;
        } catch(err){
            console.error('##### insertTodo Query error ##### \n ${ err }');
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("##### insertTodo DB error ##### \n ${ err }");
        return false;
    }
};

exports.selectTodoByType = async function(userIdx,type){
    try{
        //쿼리
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const selectTodoByTypeQuery= "select todoIdx, contents from Todos where userIdx = ? and type = ? and status ='A' ;";
            const selectTodoByTypeParams = [userIdx,type];
            const [row] =await connection.query(selectTodoByTypeQuery,selectTodoByTypeParams);
            
            
            return row;
        } catch(err){
            console.error('##### selectTodoByType Query error ##### \n ${ err }');
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("##### selectTodoByType DB error ##### \n ${ err }");
        return false;
    }
}

exports.selectValidTodo = async function(userIdx,todoIdx){
    try{
        //쿼리
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const selectValidTodoQuery= "select * from Todos where UserIdx =? and todoIdx = ? and not(status ='D');";
            const selectValidTodoParams = [userIdx,todoIdx];
            const [row] =await connection.query(selectValidTodoQuery,selectValidTodoParams);
            
            
            return row;
        } catch(err){
            console.error('##### selectValidTodo Query error ##### \n ${ err }');
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("##### selectValidTodo DB error ##### \n ${ err }");
        return false;
    }
}

exports.updateTodo = async function(contents,status,userIdx,todoIdx){
    try{
        //쿼리
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const updateTodoQuery= 
"update Todos set contents = ifnull(? , contents)  , status = ifnull(?, status)  where userIdx = ? and todoIdx= ? ;";
            const updateTodoParams = [contents,status,userIdx,todoIdx];
            const [row] =await connection.query(updateTodoQuery,updateTodoParams);
            
            
            return row;
        } catch(err){
            console.error('##### updateTodo Query error ##### \n ${ err }');
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("##### updateTodo DB error ##### \n ${ err }");
        return false;
    }
}


exports.deleteTodo = async function(userIdx,todoIdx){
    try{
        //쿼리
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const deleteTodoQuery= "update Todos set status='D' where userIdx = ? and todoIdx=?;";
            const deleteTodoParams = [userIdx,todoIdx];
            const [row] =await connection.query(deleteTodoQuery,deleteTodoParams);
            
            
            return row;
        } catch(err){
            console.error('##### deleteTodo Query error ##### \n ${ err }');
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("##### deleteTodo DB error ##### \n ${ err }");
        return false;
    }
}

const {pool} = require("../../database");

exports.insertUser =async function(email,password,nickname){
    try{
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const insertUserQuery= "insert into Users ( email , password , nickname ) values (?,?,?);" ;

            const insertUserParams =  [ email , password , nickname ];

            const [row] =await connection.query(insertUserQuery,insertUserParams);
            
            
            return row;
        } catch(err){
            console.error("insertUser query error");
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

exports.selectUserByEmail =async function(email){
    try{
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const selectUserByEmailQuery= "select * from Users where email = ?" ;

            const selectUserByEmailParams =  [ email ];

            const [row] =await connection.query(selectUserByEmailQuery,selectUserByEmailParams);
            
            
            return row;
        } catch(err){
            console.error("selectUserByEmail query error");
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

exports.selectUser = async function(email, password){
    try{
        const connection = await pool.getConnection(async(conn) => conn);
        try{
            const selectUserQuery= "select * from Users where email = ? and password = ?" ;

            const selectUserParams =  [ email, password ];

            const [row] =await connection.query(selectUserQuery,selectUserParams);
            
            
            return row;
        } catch(err){
            console.error("selectUser query error");
            return false;
        }
        finally{
            connection.release();
        }
    }catch(err){
        console.log("err");
        return false;
    }
}
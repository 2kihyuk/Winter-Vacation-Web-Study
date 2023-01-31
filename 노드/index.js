const compression = require("compression");
const express = require('express');
const cors = require("cors");
const app = express()
const port = 3000
const { userRouter } = require("./src/router/userRouter");

const{ indexRouter } =require("./src/router/indexRouter");

/*express 미들웨어 설정 */

//cors 설정  
app.use(cors());

//패킷의 바디값에서 json을 파싱
// 클라이언트에게서 패킷이 날라오면 거기서 바디를 찾아내고 json 값을 파싱해낼수있음
app.use(express.json());

//HTTP 요청 압축
app.use(compression());

//라우터 분리 
indexRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`)
});
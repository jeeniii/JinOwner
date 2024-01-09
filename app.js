const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3030); // 포트 설정
app.set("host", process.env.HOST || "0.0.0.0"); // 아이피 설정

// 루트 접속시 아이피 출력
app.get("/", function (req, res) {
  res.send("접속된 아이피: " + req.ip);
});

// 서버 동작중인 표시
app.listen(app.get("port"), app.get("host"), () =>
  console.log(
    "Server is running on : " + app.get("host") + ":" + app.get("port")
  )
);
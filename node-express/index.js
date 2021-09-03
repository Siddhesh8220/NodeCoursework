const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
//we dont need body parser

const hostname = "localhost";
const port = 3000;

const app = express();
// app.use(helmet());
app.use(morgan("dev"));
// app.use(cors());
// app.use(express.static(__dirname + "/public")); serving static http file
app.use(express.json());

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

app.use((req, res, next) => {
  //   console.log(req.headers); removed to check morgan
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body>this is express server</body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`server running on port http://${hostname}:${port}`);
});

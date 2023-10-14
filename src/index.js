require("dotenv").config(); // before everything else

const express = require("express");
require("./config/db");

const cors = require("cors");
const rateLimit = require("express-rate-limit");

const baseRouter = require("./routes/baseRoutes");
const bookRouter = require("./routes/bookRoutes");
const publisherRouter = require("./routes/publisherRoutes");
const authRouter = require("./routes/auth");

const { clearAndInsertData } = require("./models/db-data");
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const whitelist = ["http://localhost:4001"];
      const isAllowed = whitelist.includes(origin);
      callback(null, isAllowed);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Return rate limit info in the "RateLimit.*" headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting
app.use(limiter);

app.use(express.json());
// app.use(express.json({ limit: "1mb" })); // set how big of a payload
// app.use(express.urlencoded({ limit: "1mb", extended: true })); // limit url request size / allow parse nesting
// app.use((_req, res, next) => {
//   res.header({
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Content-Type",
//   });
//   next(); // move to the next middleware
// });
// app.disable("x-powered-by"); // don't show express technology in response header

clearAndInsertData();

app.use("/books", bookRouter);
app.use("/publishers", publisherRouter);
app.use("/auth/", authRouter);
app.use("/", baseRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

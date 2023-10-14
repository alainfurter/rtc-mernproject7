const { verifyToken } = require("../config/jwt");

const secretToken = process.env.QUERY_SECRET_TOKEN;

const isAuthenticated = (req, res, next) => {
  const { token } = req.query;
  if (token === secretToken) {
    next();
    return;
  } else {
    res.status(401).json({ data: "Incorrect token authentication" });
  }
};

const hasValidJWTToken = (req, res, next) => {
  try {
    //const { token } = req.query; // from request url

    //console.log(req.headers); // from headers, bearer
    const { authorization } = req.headers;
    const [, /*bearer*/ token] = authorization.split(" ");

    const payload = verifyToken(token);
    //console.log("Payload: ", payload);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ data: "Not Authenticated" });
  }
};

module.exports = { isAuthenticated, hasValidJWTToken };

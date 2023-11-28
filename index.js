const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { envConfig } = require("./constants/config");
const { connectDB } = require("./services/database.services");

const userRoutes = require("./routes/user.routes");
const roomRoutes = require("./routes/room.routes");
const adminRoutes = require("./routes/admin.routes");
const hostRoutes = require("./routes/host.routes");

const port = envConfig.port;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

connectDB();
app.set("trust proxy", 1); // Trust first proxy
app.use(limiter);
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/host", hostRoutes);

app.get("/", (req, res) => {
  res.send("Chào mừng tới api phòng trọ!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

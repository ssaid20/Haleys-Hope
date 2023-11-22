const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const {setupCronJobs} = require(`./scheduledTasks/scheduledTasks`)
const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");
// Route includes
const userRouter = require("./routes/user.router");
const kteaRouter = require("./routes/ktea.router");
const elementary_wistRouter = require("./routes/elementary_wist.router");
const secondary_wistRouter = require("./routes/secondary_wist.router");
const gortRouter = require("./routes/gort.router");
const young_ctoppRouter = require("./routes/young_ctopp.router");
const old_ctoppRouter = require("./routes/old_ctopp.router");
const studentRouter = require("./routes/student.router");
const assessmentRouter = require("./routes/assessment_results.router");
const coachRouter = require("./routes/coach.router");
const commentsRouter = require("./routes/comments.router");

// Increments Grade +1 Every August
setupCronJobs();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/ktea", kteaRouter);
app.use("/api/elementary_wist", elementary_wistRouter);
app.use("/api/secondary_wist", secondary_wistRouter);
app.use("/api/gort", gortRouter);
app.use("/api/young_ctopp", young_ctoppRouter);
app.use("/api/old_ctopp", old_ctoppRouter);
app.use("/api/students", studentRouter);
app.use("/api/assessment", assessmentRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/comments", commentsRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

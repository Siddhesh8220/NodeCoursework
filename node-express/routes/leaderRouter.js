const express = require("express");

const leaderRouter = express.Router();

leaderRouter.use(express.json());
leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("will send you all the leaders to you!");
  })
  .post((req, res, next) => {
    res.end(
      "will add leader: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation not supported on leaders");
  })
  .delete((req, res, next) => {
    res.end("deleted all leaders!");
  });

//Adding support for :leaderId
leaderRouter
  .route("/:leaderId")

  .get((req, res, next) => {
    res.end("will send details of leader " + req.params.leaderId + " to you");
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not supported on leader " + req.params.leaderId);
  })

  .put((req, res, next) => {
    res.write("Updating the leader: " + req.params.leaderId);
    res.end(
      "will update the leader: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting leader: " + req.params.leaderId);
  });

module.exports = leaderRouter;

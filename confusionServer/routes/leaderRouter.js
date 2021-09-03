const express = require("express");
const Leaders = require("../models/leaders");

const leaderRouter = express.Router();

leaderRouter.use(express.json());
leaderRouter
  .route("/")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/plain");
  //   next();
  // })
  .get((req, res, next) => {
    Leaders.find({})
      .then(
        (dishes) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dishes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Leaders.create(req.body)
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation is not supported on /leaders");
  })
  .delete((req, res, next) => {
    Leaders.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

//Adding support for :leaderId
leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(
        (leader) => {
          if (leader !== null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(leader);
          } else {
            err = new Error("leader " + req.params.leaderId + " not found.");
            err.status = 404;
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not supported on /leaders/" + req.params.leaderId);
  })

  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (leader) => {
          if (leader !== null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(leader);
          } else {
            err = new Error("leader " + req.params.leaderId + " not found.");
            err.status = 404;
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId)
      .then(
        (leader) => {
          if (leader != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ status: "ok" });
          } else {
            err = new Error("leader " + req.params.leaderId + " not found.");
            err.status = 404;
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => {
        next(err);
      });
  });

module.exports = leaderRouter;

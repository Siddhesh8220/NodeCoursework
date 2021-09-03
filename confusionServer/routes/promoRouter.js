const express = require("express");
const Promotions = require("../models/promotions");

const promoRouter = express.Router();

promoRouter.use(express.json());
promoRouter
  .route("/")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/plain");
  //   next();
  // })
  .get((req, res, next) => {
    Promotions.find({})
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
    Promotions.create(req.body)
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
    res.end("put operation is not supported on /promotions");
  })
  .delete((req, res, next) => {
    Promotions.remove({})
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

//Adding support for :promoId
promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then(
        (promotion) => {
          if (promotion !== null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(promotion);
          } else {
            err = new Error("Promotion " + req.params.promoId + " not found.");
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
    res.end("Post operation not supported on promotions " + req.params.promoId);
  })

  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (promotion) => {
          if (promotion !== null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(promotion);
          } else {
            err = new Error("Promotion " + req.params.promoId + " not found.");
            err.status = 404;
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId)
      .then(
        (promotion) => {
          if (promotion != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ status: "ok" });
          } else {
            err = new Error("Promotion " + req.params.promoId + " not found.");
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

module.exports = promoRouter;

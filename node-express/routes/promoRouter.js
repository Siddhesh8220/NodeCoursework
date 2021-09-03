const express = require("express");

const promoRouter = express.Router();

promoRouter.use(express.json());
promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("will send you all the promotions to you!");
  })
  .post((req, res, next) => {
    res.end(
      "will add promotion: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation not supported on promotions");
  })
  .delete((req, res, next) => {
    res.end("deleted all Promotions");
  });

//Adding support for :promoId
promoRouter
  .route("/:promoId")

  .get((req, res, next) => {
    res.end("will send details of promotion " + req.params.promoId + " to you");
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not supported on promotions " + req.params.promoId);
  })

  .put((req, res, next) => {
    res.write("Updating the promotion: " + req.params.promoId);
    res.end(
      " will update the promotion :" +
        req.body.name +
        " with details " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting promomotion: " + req.params.promoId);
  });

module.exports = promoRouter;

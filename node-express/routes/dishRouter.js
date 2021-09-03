const express = require("express");
//no body parser as it is deprecated
const dishRouter = express.Router();

dishRouter.use(express.json());
dishRouter
  .route("/")

  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/palin");
    next();
  })

  //next will execute app.get
  .get((req, res, next) => {
    res.end("will send all dishes to you");
  })

  .post((req, res, next) => {
    //post will receive some info
    //req.body will give data insisde re body
    res.end(
      "will add the dish: " +
        req.body.name +
        "  with details: " +
        req.body.description
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation not supported on dishes");
  })

  .delete((req, res, next) => {
    res.end("Deleting all dishes!");
  });

//Adding support for :dishId
dishRouter
  .route("/:dishId")

  .get((req, res, next) => {
    res.end("will send details of dish " + req.params.dishId + "to you");
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation not supported on dishes " + req.params.dishId);
  })

  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId);
    res.end(
      " will update the dish :" +
        req.body.name +
        " with details " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
  });

module.exports = dishRouter;

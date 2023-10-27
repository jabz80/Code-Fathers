const { Router } = require("express");

const exampleController = require("../controllers/exampleController");

const exampleRouter = Router();

exampleRouter.get("/", exampleController.index);
exampleRouter.get("/:id", exampleController.show);
exampleRouter.post("/", exampleController.create);
exampleRouter.delete("/:id", exampleController.destroy);
exampleRouter.patch("/:id", exampleController.update);

module.exports = exampleRouter;

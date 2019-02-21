import * as express from "express";
import controller from "./user.controller";
import Resource from "../../common/Resource";

const router: express.Router = express.Router();

const resource = Resource.create(router, controller, ['store']);
resource.post('/', controller.register);

export default resource;
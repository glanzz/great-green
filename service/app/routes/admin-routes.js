import { getRouter } from "../utility.js";
import * as centerController from '../controllers/centers-controller.js';
import * as badgeController from '../controllers/badge-controller.js';
import * as plantController from '../controllers/plant-controller.js';
import * as addonController from '../controllers/addon-controller.js';
import * as saplingKitController from '../controllers/sapling-kit-controller.js';
import * as centerKitController from '../controllers/center-kit-controller.js';
import upload from "../middlewares/multer.js";

const adminRouter = getRouter(true, true);

adminRouter.route('/centers').post(centerController.post).get(centerController.search);
adminRouter.route('/centers/:id').patch(centerController.update).delete(centerController.deleteCenter);

adminRouter.route('/badges').post(upload.single("file"), badgeController.post).get(badgeController.search);
adminRouter.route('/badges/:id').patch(upload.single("file"), badgeController.update).delete(badgeController.deleteBadge);

adminRouter.route('/plants').post(plantController.post).get(plantController.search);
adminRouter.route('/plants/:id').patch(plantController.update).delete(plantController.deletePlant);

adminRouter.route('/addons').post(addonController.post).get(addonController.search);
adminRouter.route('/addons/:id').patch(addonController.update).delete(addonController.deleteAddon);

adminRouter.route('/saplingKits').post(saplingKitController.post).get(saplingKitController.search);
adminRouter.route('/saplingKits/:id').put(saplingKitController.put).delete(saplingKitController.deleteSaplingkit);

adminRouter.route("/centers/:id/kits").post(centerKitController.post)
adminRouter.route("/centers/:id/kits/:kitId").patch(centerKitController.update).delete(centerKitController.deleteCenterKit)

export default adminRouter;


import { getRouter } from "../utility.js";
import * as journeyController from "../controllers/journey-controller.js";
import * as contributionController from "../controllers/contribution-controller.js";
import * as affiliationController from "../controllers/affiliation-controller.js";
import upload from "../middlewares/multer.js";


const router = getRouter(true);

router.route('/journeys').get(journeyController.search).post(journeyController.post);
router.route('/journeys/:id').patch(journeyController.patch);
router.route('/journeys/:id/contributions').post(contributionController.post);
router.route('/journeys/:id/contributions/complete').patch(contributionController.patch);
router.route('/journeys/:id/affiliations').post(affiliationController.post).get(affiliationController.get);
router.route('/journeys/:id/affiliations/:requestid/accept').post(affiliationController.accept);
router.route('/journeys/:id/affiliations/:requestid/reject').post(affiliationController.reject);
router.route('/journeys/:id/affiliations/:requestid/complete').post(affiliationController.complete);
router.route('/journeys/:id/milestones').post(upload.single("file"), journeyController.addMilestone);

export default router;


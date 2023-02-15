import express from "express";
import AppliancesCtrl from "./appliances.controller.js";

const router = express.Router();

router.route("/").get(AppliancesCtrl.apiGetAppliances);

// router
//   .route("/review")
//   .post(ReviewsCtrl.apiPostReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview);

export default router;

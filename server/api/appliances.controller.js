import AppliancesDAO from "../dao/appliancesDAO.js";

export default class AppliancesController {
  static async apiGetAppliances(req, res, next) {
    const appliancesPerPage = req.query.appliancesPerPage
      ? parseInt(req.query.appliances, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { appliancesList, totalNumAppliances } =
      await AppliancesDAO.getAppliances({
        filters,
        page,
        appliancesPerPage,
      });

    let response = {
      appliances: appliancesList,
      page: page,
      filters: filters,
      entries_per_page: appliancesPerPage,
      total_results: totalNumAppliances,
    };
    res.json(response);
  }
}

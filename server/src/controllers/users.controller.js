import UsersModel from "../models/users.model.js";

export default class UsersController {
  static async controllerGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.users)
      : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { usersList, totalNumUsers } = await UsersModel.getUsers({
      filters,
      page,
      usersPerPage,
    });

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    };
    res.json(response);
  }
}

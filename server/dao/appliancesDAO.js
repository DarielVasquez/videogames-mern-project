let appliances;

export default class AppliancesDAO {
  static async injectDB(conn) {
    if (appliances) {
      return;
    }
    try {
      appliances = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("appliances");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in appliancesDAO: ${e}`
      );
    }
  }

  static async getAppliances({
    filters = null,
    page = 0,
    appliancesPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      }
    }

    let cursor;

    try {
      cursor = await appliances.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { appliancesList: [], totalNumAppliances: 0 };
    }

    const displayCursor = cursor
      .limit(appliancesPerPage)
      .skip(appliancesPerPage * page);

    try {
      const appliancesList = await displayCursor.toArray();
      const totalNumAppliances = await appliances.countDocuments(query);

      return { appliancesList, totalNumAppliances };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { appliancesList: [], totalNumAppliances: 0 };
    }
  }
}

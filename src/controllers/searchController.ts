import search from "../models/search";

class SearchController {
  get(req: any, res: any) {
    search
      .selectByText({ text: req.query.q })
      .then((results: any) => res.status(200).send(results.json))
      .catch((err) =>
        res.status(err.httpStatus).send({ message: err.httpMessage })
      );
  }
}

const searchController = new SearchController();

export default searchController;

import words from "../models/words";

class WordsController {
  index(req: any, res: any) {
    words
      .all()
      .then((results: any) => res.status(200).send(results.json))
      .catch((err) =>
        res.status(err.httpStatus).send({ message: err.httpMessage })
      );
  }

  get(req: any, res: any) {
    words
      .selectById({ id: req.params.id })
      .then((results: any) => res.status(200).send(results.json))
      .catch((err) =>
        res.status(err.httpStatus).send({ message: err.httpMessage })
      );
  }

  create(req: any, res: any) {
    const values = { text: req.body.text, mind: req.body.mind };

    words
      .create(values)
      .then((results: any) => res.status(201).send(results.json))
      .catch((err) =>
        res.status(err.httpStatus).send({ message: err.httpMessage })
      );
  }

  async update(req: any, res: any) {
    const word: any = await words
      .selectById({ id: req.params.id })
      .catch((err) =>
        res.status(err.httpStatus).json({ message: err.httpMessage })
      );

    const values = {
      id: req.params.id,
      text: req.body.text ? req.body.text : word.text,
      mind: req.body.mind ? req.body.mind : word.mind,
    };

    words
      .update(values)
      .then((result: any) => res.status(200).send(result.json))
      .catch((err) =>
        res.status(err.httpStatus).json({ message: err.httpMessage })
      );
  }

  delete(req: any, res: any) {
    words
      .delete({ id: req.params.id })
      .then((results: any) => res.status(200).send(results.json))
      .catch((err) =>
        res.status(err.httpStatus).send({ message: err.httpMessage })
      );
  }
}

const wordsController = new WordsController();

export default wordsController;

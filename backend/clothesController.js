const { queryClothes } = require("./PostgreDB");
const clothesController = {
  // entire clothing data results
  export_keyword(req, res) {
    const clothes_type = req.query;
    queryClothes("SELECT * FROM $1", [clothes_type], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
      // res.status(200).send(results.rows);
    });
  },
  // specific clothing data results
  findOne(req, res) {
    const _type = req.query.clothes_type;
    const _code = req.query.clothes_code;
    queryClothes(
      "SELECT * FROM $1 WHERE id = $2",
      [_type, _code],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
        // res.status(200).send(results.rows);
      }
    );
  },
  // user register clothes data results

  findIdClothes(req, res) {
    const mem_id = req.query.clothes.mem_id;
    const clothes_type = req.query.clothes.clothes_type;
    queryClothes(
      "SELECT ($1_shape, $1_classification, $1_color) FROM $2 WHERE t_code LIKE '$3_%';",
      [clothes_type[0], clothes_type, mem_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  },
  findfeatureCode(req, res) {},

const clothesController = {
  // entire clothing data results
  keywordResearch(req, res) {
    const clothes_type = req.query;
    queryClothes("SELECT * FROM $1", [clothes_type], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
      // res.status(200).send(results.rows);
    });
  },
  // specific clothing data results
  findOne(req, res) {
    const _type = req.query.clothes_type;
    const _code = req.query.clothes_code;
    queryClothes(
      "SELECT * FROM $1 WHERE id = $2",
      [_type, _code],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
        // res.status(200).send(results.rows);
      }
    );
  },
  // user register clothes data results
  findIdClothes(req, res) {
    const mem_id = req.query.clothes.mem_id;
    const clothes_type = req.query.clothes.clothes_type;
    queryClothes(
      "SELECT ($1_shape, $1_classification, $1_color) FROM $2 WHERE t_code LIKE '$3_%';",
      [clothes_type[0], clothes_type, mem_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  },
};

module.exports = clothesController;
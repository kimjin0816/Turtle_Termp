const { queryClothes } = require("./PostgreDB");

// entire clothing data results
exports.export_keyword = (req, res) => {
  const clothes_type = req.query;
  queryClothes("SELECT * FROM $1", [clothes_type], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    // res.status(200).send(results.rows);
  });
};

// specific clothing data results
exports.findOne = (req, res) => {
  const _type = req.query.clothes_type;
  const _code = req.query.clothes_code;
  queryMembers(
    "SELECT * FROM $1 WHERE id = $2",
    [_type, _code],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
      res.status(200).send(results.rows);
    }
  );
};

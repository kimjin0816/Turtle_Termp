// const { Client } = require("pg");
const Pool = require("pg").Pool;

// 데이터베이스 연결 설정
const pool = new Pool({
  host: "postgre",
  user: "localhost",
  password: "password",
  database: "Clothes",
});

// entire clothing data results
exports.findAll = (req, res) => {
  const clothes_type = req.query;
  pool.query("SELECT * FROM $1", [clothes_type], (error, results) => {
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
  pool.query(
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

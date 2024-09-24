// const { queryClothes } = require("./PostgreDB");
// const ps = require("./passport-session");

// const clothesController = {
//   async t_c_SelectId(req, res, next) {
//     const id = ps.userId;
//     console.log(id);
//     queryClothes(
//       "SELECT * FROM searchLog WHERE userID = $1;",
//       [id],
//       (error, result) => {
//         if (error) {
//           throw error;
//         }
//         console.log(result.rows);
//         res.json(result.rows);
//         console.log("t_clothes select success");
//         // return result.rows;
//       }
//     );
//   },
//   async searchLog_Insert(id, top_bottom, keywordArray, img, f_code) {
//     queryClothes(
//       "INSERT INTO searchLog(userID, top_bottom, shape, classification, color, img, date, f_code) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7);",
//       [
//         id,
//         top_bottom,
//         keywordArray[0],
//         keywordArray[1],
//         keywordArray[2],
//         img,
//         f_code,
//       ],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         console.log("t_clothes insert success");
//         return results.rows;
//       }
//     );
//   },

//   async t_c_Delete(req, res) {
//     const id = ps.userId;
//     queryClothes(
//       "DELETE FROM clothes_top WHERE t_code = $1||'_%';",
//       [id],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         console.log("t_clothes delete success");
//         res.json(results.rows);
//       }
//     );
//   },
// };
// module.exports = clothesController;

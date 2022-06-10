import db from "../utility/DBUtil";
import Value from "../types/value.type";
const table = "words";

class Search {
  async selectByText(value: Value) {
    const query = `SELECT * FROM ${table} WHERE text = :text`;
    const values = value;
    const result = await db.exeQuery(query, values);
    return result;
  }
}

const search = new Search();

export default search;

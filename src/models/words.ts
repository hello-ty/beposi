import db from "../utility/DBUtil";
import Value from "../types/value.type";
const table = "words";

class Words {
  async all() {
    const query = `SELECT * FROM ${table}`;
    const result = await db.exeQuery(query, "");
    return result;
  }

  async selectById(value: Value) {
    const query = `SELECT text, mind FROM ${table} WHERE id = :id`;
    const values = value;
    const result = await db.exeQuery(query, values);
    return result;
  }

  async create(value: Value) {
    const query = `INSERT INTO ${table} (text, mind) VALUES (:text, :mind)`;
    const values = value;
    const result = await db.exeQuery(query, values);
    return result;
  }

  async update(value: Value) {
    const query = `UPDATE ${table} SET text = :text, mind = :mind WHERE id = :id`;
    const values = value;
    const result = await db.exeQuery(query, values);
    return result;
  }

  async delete(value: Value) {
    const query = `DELETE FROM ${table} WHERE id = :id`;
    const values = value;
    const result = await db.exeQuery(query, values);
    return result;
  }
}

const words = new Words();

export default words;

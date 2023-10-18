const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "evenement" });
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.connection.query(`
      SELECT e.*, a.nom AS activite
      FROM evenement e
      LEFT JOIN activite a ON e.id = a.evenement
    `);
  }

  findByDate() {
    return this.connection.query(
      `SELECT * FROM ${this.table} ORDER BY date_de_debut`
    );
  }

  insert(event) {
    return this.connection.query(
      `insert into ${this.table} (nom, lieu, date_de_debut) values (?, ?,?)`,
      [event.nom, event.lieu, event.date_de_debut]
    );
  }

  update(event) {
    return this.connection.query(
      `update ${this.table} set nom = ?, lieu = ? where id = ?`,
      [event.nom, event.lieu, event.id]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = EventManager;

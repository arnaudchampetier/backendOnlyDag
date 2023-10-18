const AbstractManager = require("./AbstractManager");

class ActivityManager extends AbstractManager {
  constructor() {
    super({ table: "activite" });
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(activite) {
    return this.connection.query(
      `insert into ${this.table} (nom,  date_de_création, date_de_début, evenement) values (?, ?,?, ?)`,
      [
        activite.nom,
        activite.date_de_creation,
        activite.date_de_debut,
        activite.evenement,
      ]
    );
  }

  searchByName(nom) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE nom LIKE ?`,
      [`%${nom}%`]
    );
  }
}

module.exports = ActivityManager;

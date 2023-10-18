const models = require("../models");

// get all events
const browse = (req, res) => {
  models.evenement
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

// get event by its id
const read = (req, res) => {
  models.evenement
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

// edit an event
const edit = (req, res) => {
  const evenement = req.body;

  evenement.id = parseInt(req.params.id, 10);

  models.evenement
    .update(evenement)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

// ajouter un événement
const add = (req, res) => {
  const evenement = req.body;

  models.evenement
    .insert(evenement)
    .then(([result]) => {
      res.location(`/events/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.warn("pas bon");
      console.error(error);

      res.sendStatus(500);
    });
};
const searchByDate = (req, res) => {
  console.warn("Recherche des événements par date...");

  models.evenement
    .findByDate()
    .then(([rows]) => {
      console.warn("Événements trouvés :", rows);
      res.send(rows);
    })
    .catch((error) => {
      console.error("Erreur lors de la recherche par date :", error);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.evenement
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  searchByDate,
  destroy,
};

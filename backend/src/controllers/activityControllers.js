const models = require("../models");

// get all activities
const browse = (req, res) => {
  models.activite
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((error) => {
      console.warn("pas bonnnnngros ");
      console.error(error);
      res.sendStatus(500);
    });
};

// get activity by its id
const read = (req, res) => {
  models.activity
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((error) => {
      console.warn("pas tout à fait bon");
      console.error(error);
      res.sendStatus(500);
    });
};

// edit an activity
const edit = (req, res) => {
  const activity = req.body;

  activity.id = parseInt(req.params.id, 10);

  models.activity
    .update(activity)
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

// add an activity
const add = (req, res) => {
  const activite = req.body;
  const { eventId } = req.params;
  activite.evenement = eventId;
  console.warn("activity:", activite); // Ajout d'une instruction de débogage pour afficher l'activité dans la console

  models.activite
    .insert(activite)
    .then(([result]) => {
      console.warn("result:", result); // Ajout d'une instruction de débogage pour afficher le résultat dans la console

      res
        .location(`/events/${eventId}/activities/${result.insertId}`)
        .sendStatus(201);
    })
    .catch((error) => {
      console.warn("pas tout à fait bon");
      console.error(error);

      res.sendStatus(500);
    });
};

// Rechercher une activité par nom
const searchByName = (req, res) => {
  const { nom } = req.query;
  console.warn("Nom recherché :", nom); // Ajouter cette ligne pour afficher le nom recherché dans la console

  models.activite
    .searchByName(nom)
    .then(([rows]) => {
      console.warn("Résultats de la recherche :", rows); // Ajouter cette ligne pour afficher les résultats de la recherche dans la console
      res.send(rows);
    })
    .catch((error) => {
      console.warn("Erreur lors de la recherche d'activités par nom :");
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  searchByName,
};

const express = require("express");

const router = express.Router();

const EventController = require("./controllers/eventControllers");
const ActivityController = require("./controllers/activityControllers");

//  routes des événements
router.post("/api/events", EventController.add); // Consigne 1 :  Créer un événement
router.get("/api/events", EventController.browse); // Récyperer tous les événements

//  routes des activités
router.post("/api/events/:eventId/activities", ActivityController.add); // Consigne 2 : Créer une activité liée à un événement
router.get("/api/activities/search", ActivityController.searchByName); // Consigne 3 : Rechercher une activité par nom
router.get("/api/activities", ActivityController.browse); // Consigne 3 : récupérer ttes les activités
router.delete("/api/events/:id", EventController.destroy); // rajouté : Supprimer une activité
router.get("/api/events/sorted", EventController.searchByDate); // Consigne 4 : Trier les évènements pra leur date de debut

module.exports = router;

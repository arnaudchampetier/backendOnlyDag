-- Création de la table "evenement"
CREATE TABLE evenement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  lieu VARCHAR(255) NOT NULL,
    date_de_debut DATE NOT NULL, 
nombre_de_participants INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table "activite"
CREATE TABLE activite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  date_de_création DATE NOT NULL,
  date_de_début DATE NOT NULL,
  record_parcours VARCHAR(255) NOT NULL DEFAULT "Aucun",
  evenement INT NOT NULL,
  FOREIGN KEY (evenement) REFERENCES evenement(id)
);

-- Ajout d"événements
INSERT INTO evenement (nom, lieu, date_de_debut) VALUES
  ('Evénement X', 'Villeurbanne', '2023-06-01'),
  ('Evénement Y', 'Lyon', '2023-06-15'),
  ('Evénement Z', 'Chicago', '2023-07-01');

-- Ajout d"activités
  INSERT INTO activite (nom, date_de_création, date_de_début, evenement)
VALUES 
  ('10 kilomètres', '2023-05-15', '2023-05-21', 1),
  ('Semi-marathon', '2023-05-16', '2023-05-22', 2),
  (' Marathon', '2023-05-17', '2023-05-23', 3);

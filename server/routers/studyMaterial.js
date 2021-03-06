// importing all files
const express = require ('express');
const router = express.Router ();
const studyMaterial = require ('../models/studyMaterial');
const user = require ('../models/user');

router.use (express.json ());

// used to send all the study material
router.post ('/fetch', (req, res) => {
  studyMaterial
    .find ({})
    .then (material => res.json (material))
    .catch (err => console.log ('from material.js ' + err));
});

// adding all the study material
router.post ('/add', async (req, res) => {
  try {
    const material = req.body;

    await user
      .findById (material.by)
      .then (resp => {
        user_image = resp.imageUrl;
        user_name = resp.name;
      })
      .catch (err => console.log (222, err));

    const newMaterial = await new studyMaterial ({
      by: material.by,
      topic: material.topic,
      description: material.description,
      link: material.link,
      location: material.location,
      tags: material.tags,
      userName: user_name,
      userImage: user_image,
    });

    // saving the study material
    await newMaterial
      .save ()
      .then (material => res.json (material))
      .catch (err => console.log (333, err));
  } catch (err) {
    console.log ('outside try ' + err);
  }
});

// deleting the material from the database
router.post ('/deleteMaterial', async (req, res) => {
  try {
    // collecting the important information from request body
    const {materialId} = req.body;
    const delUser = await studyMaterial.findByIdAndDelete (materialId);

    if (!delUser) return res.sendStatus (404);

    res.send ('deleted');
  } catch (e) {
    console.log ('Error ', e);
  }
});

module.exports = router;

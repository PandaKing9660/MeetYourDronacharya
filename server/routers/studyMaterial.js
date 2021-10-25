const express = require ('express');
const router = express.Router ();
const studyMaterial = require ('../models/studyMaterial');
const user = require ('../models/user');

router.use (express.json ());

router.post ('/fetch', (req, res) => {
  studyMaterial
    .find ({})
    .then (material => res.json (material))
    .catch (err => console.log ('from material.js ' + err)); 
});

router.post ('/add', async (req, res) => {
  try {
    const material = req.body;
    console.log(material);

    await user
      .findById (material.by)
      .then (resp => {
        user_image = resp.imageUrl;
        user_name = resp.name;
      })
      .catch (err => console.log(222, err));

    const newMaterial = await new studyMaterial ({
      by: material.by,
      topic: material.topic,
      description: material.description,
      material: material.material,
      tags: material.tags,
      userName: user_name,
      userImage: user_image
    });

    await newMaterial
      .save()
      .then (material => res.json (material))
      .catch (err => console.log(333, err))

  } catch (err) {
    console.log ('outside try ' + err)
  }
});

module.exports = router;

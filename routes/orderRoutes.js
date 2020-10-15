module.exports = (app, orderCollection) => {
  //Adds new order
  app.post("/addorder", (req, res) => {
    const { name, email, price, detail, service } = req.body;
    const projectFile = req.files.project;
    const status = "pending";

    const projectImageFile = projectFile.data;
    const encodedProjectImage = projectImageFile.toString("base64");

    const projectImage = {
      contentType: projectFile.mimeType,
      size: projectFile.size,
      img: Buffer.from(encodedProjectImage, "base64"),
    };

    orderCollection
      .insertOne({ name, email, service, detail, price, projectImage, status })
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  // Gets all orders of the current user
  app.post("/allorders", (req, res) => {
    orderCollection
      .find({ email: req.body.email })
      .toArray((err, documents) => {
        if (!err) {
          return res.send(documents);
        }
        res.send(null);
      });
  });
};

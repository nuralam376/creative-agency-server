module.exports = (app, adminCollection) => {
  // Add admin email address
  app.post("/makeadmin", (req, res) => {
    adminCollection
      .insertOne(req.body)
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });
};

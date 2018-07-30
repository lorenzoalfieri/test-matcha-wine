var Sentiment = require("node-sentiment");

var appRouter = function(app) {
  app.get("/", function(req, res) {
    if (req.query != null && req.query.text != null) {
      const result = Sentiment(req.query.text);
      if (result.vote === "positive") {
        let smileyString = result.tokens.reduce(
          (reducer, token) => reducer + ":) ",
          ""
        );
        res.status(200).send(smileyString.slice(0, -1));
      } else {
        // There is a possibility for "neutral" vote when you send only one word or a sentence with only neutral word ex: orange is orange
        res.status(200).send(result.tokens.reverse().join(" "));
      }
    } else {
      res
        .status(200)
        .send("To use this API, you need to use the query field 'text'.");
    }
  });
};

module.exports = appRouter;

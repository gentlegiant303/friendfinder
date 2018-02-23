let path = require("path");
let friends = require("../data/friends.js");
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    let userInput = req.body;
    let userResponses = userInput.scores;
    let matchName = '';
    let matchImage = '';
    let totalDifference = 10000;
    for (let i = 0; i < friends.length; i++) {
      let difference = 0;
      for (let j = 0; j < userResponses.length; j++) {
        difference += Math.abs(friends[i].scores[j] - userResponses[j]);
      }
      if (difference < totalDifference) {
        totalDifference = difference;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }
    friends.push(userInput);
    res.json({
      status: 'OK',
      matchName: matchName,
      matchImage: matchImage
    });
  });
};
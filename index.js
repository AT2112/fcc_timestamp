
var express = require("express");
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res, next) => {
  req.date = new Date().toUTCString().split(" ");
  req.unix = new Date().getTime();
  req.date = `${req.date[0]}, ${req.date[1]} ${req.date[2]} ${req.date[3]} ${req.date[4]} ${req.date[5].substring(0,3)}`
  next();
  }, 
  (req, res) => {
    res.json({
      unix: req.unix,
      utc: req.date
    });
  }
);

app.get("/api/:date", (req, res, next) => {
  req.time_obj = req.params.date;
  if (isNaN(new Date(req.time_obj)) && isNaN(new Date(parseInt(req.time_obj)))) {
    res.json({
      error: "Invalid Date"
    });
  } else if (/^\d+$/.test(req.time_obj)) {
    req.unix = parseInt(req.time_obj);
    req.date = new Date(req.unix).toUTCString().split(" ");
    req.date = `${req.date[0]} ${req.date[1]} ${req.date[2]} ${req.date[3]} ${req.date[4]} ${req.date[5].substring(0,3)}`
  
  } else {
    req.date = new Date(req.time_obj).toUTCString().split(" ");
    req.date = `${req.date[0]} ${req.date[1]} ${req.date[2]} ${req.date[3]} ${req.date[4]} ${req.date[5].substring(0,3)}`
    req.unix = new Date(req.time_obj).getTime();
  };
  next();
  },
  (req, res) => {
    res.json({
      unix: req.unix,
      utc: req.date
    });
  }
);

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

async function notifyLine(token, message) {
  try {
    const response = await axios({
      method: "POST",
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization : "Bearer " + token,
      },
      data: "message=" +message,
    });
    console.log("notify response ",response);
  } catch (err){
    console.log(err);
  }
}






app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "finalproject",
});

db.connect((err) => {
    if(err){
        console.error('Error connecting to MYSQL:',err);
    }else{
        console.log('Connected to MYSQL database');
    }
});

app.get('/',(req,res) => {
    res.json({
        msg: 'Hello World from Server'
    })
});

app.get('/home',(req,res) => {
  db.query("SELECT * FROM times", (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
})

app.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const line_id = req.body.line_id;
    const email = req.body.email;
    const password = req.body.password;

    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      const hash = await bcrypt.hash(password, saltRounds);

      await db.promise().query("INSERT INTO users (name, line_id, email, password) VALUES (?, ?, ?, ?)", [name, line_id, email, hash]);

      res.status(201).json({
        msg: "User registered successfully!",
      });
    } else {
      res.status(409).json({
        msg: "Email is already taken!",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
          return res.status(500).json({ msg: err });
      }

      if (result.length > 0) {
          const hashedPassword = result[0].password;

          bcrypt.compare(password, hashedPassword, (err, isMatch) => {
              if (err) {
                  return res.status(500).json({ msg: err });
              }

              if (isMatch) {

                {/*app.get('/home', (req, res) => {
                  
                  // ปรับแต่งคำสั่ง SQL
                  const sql = "SELECT * FROM times WHERE email = ?";
                
                  // ใส่ตัวแปร email ลงในคำสั่ง SQL
                  db.query(sql, [email], (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send(result);
                    }
                  });
                });*/}

                  // You might want to generate a token here or send user details
                return res.json({
                    msg: "Login successful!",
                    // Include any relevant user details or token here
                });
              } else {
                  return res.status(401).json({ 
                      msg: "Incorrect email or password"
                  });
              }
          });
      } else {
          return res.status(401).json({ msg: "Unregistered user!" });
      }
  });
});

app.post('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during logout' });
      }
      // Clear localStorage on the client side
      res.json({ message: 'Logout successful', clearLocalStorage: true });
    });
});

app.post("/time", async (req, res) => {
  try {
    const hour = req.body.hour;
    const pill_name = req.body.pill_name;
    const meal = req.body.meal;
    const time_clock = req.body.time_clock;
    const email = req.body.email;

    await db.promise().query("INSERT INTO times (hour, pill_name, meal, time_clock, email) VALUES (?, ?, ?, ?, ?)", [hour, pill_name, meal, time_clock ,email]);

    res.status(201).json({
      msg: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});





app.post('/sound', async (req, res) => {
  const pill_name = req.body.pill_name;
  const meal = req.body.meal;
  const email = req.body.email;

  db.query("SELECT line_id, name FROM users WHERE email = ?", [email], (err, result) => {
    
    
    const a = result;
    const lineToken = a[0].line_id;
    const name = a[0].name;
    const text = 'คุณ '+ name +' ถึงเวลารับประทานยา '+pill_name+' แล้วครับ กิน '+meal+' นะครับ';
    notifyLine(lineToken,text)
  });
});



app.post('/linenoti', async (req, res) => {
  const text = req.body.text;
  const email = req.body.email;

  db.query("SELECT line_id, name FROM users WHERE email = ?", [email], (err, result) => {
    const a = result;
    const lineToken = a[0].line_id;
    const name = a[0].name;
    const finishnoti = "คุณ"+name+text;
    notifyLine(lineToken,finishnoti)
  
  });
});

app.delete('/delete/:time_id', (req, res) => {
  const time_id = req.params.time_id;
  db.query("DELETE FROM times WHERE time_id = ?", [time_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting record");
    } else {
      res.send(result);
    }
  });
});










const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('file'), async (req, res) => {
  try {
    const email = req.body.email;
    const filePath = req.file.path;

    await db.promise().query("INSERT INTO recordmp3 (email, mp3_file) VALUES (?, ?)", [email, filePath]);

    res.status(201).json({
      msg: "File uploaded successfully!",
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


app.get('/mp3',(req,res) => {
  db.query("SELECT mp3_file FROM recordmp3", (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
})






app.put('/updateoff',(req,res) => {
  const time_id = req.body.time_id;
  const state_noti = req.body.state_noti;
  db.query("UPDATE times SET state_noti = ? WHERE time_id = ?", [state_noti, time_id], (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
})



app.put('/updateon',(req,res) => {
  const time_id = req.body.time_id;
  const state_noti = req.body.state_noti;
  db.query("UPDATE times SET state_noti = ? WHERE time_id = ?", [state_noti, time_id], (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
})












app.listen(3001, () => {
    console.log("Hello World from Server");
});


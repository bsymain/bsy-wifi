
const express = require('express');
const bodyParser= require('body-parser')

const main_dir = "./"

const app = express();
app.set('view options', { pretty: true });

const { execSync, spawn } = require("child_process");
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true })); 

var pid


app.get('/', function(request, response, next){
    var wifi_list
    try {
      const data = fs.readFileSync(main_dir+'tmp/wifi_list.txt', 'utf8');
      console.log(data);
      wifi_list = data.toString()
      wifi_list = wifi_list.replace(/(?:\r\n|\r|\n)/g, '<br>')
    } catch (err) {
      console.error(err);
    }
    
    let html = fs.readFileSync(main_dir+"index.html", 'utf8');
    if(html)
    response.send(html.replace('${wifi_list}',wifi_list));


  //~ response.send(`
    //~ <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    //~ <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    //~ <div>
    //~ <pre> 
    //~ ${wifi_list}
    //~ <\pre> 
    //~ <\div>
    //~ <div class="container">
      //~ <h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
      //~ <div class="card">
        //~ <div class="card-header">Sample Form</div>
        //~ <div class="card-body">
          //~ <form method="POST" action="/">
            //~ <div class="mb-3">
              //~ <label>SSID</label>
              //~ <input type="text" name="ssid" id="ssid" class="form-control" />
            //~ </div>
            //~ <div class="mb-3">
              //~ <label>Password</label>
              //~ <input type="text" name="password" id="password" class="form-control" />
            //~ </div>
            //~ <div class="mb-3">
                    //~ <div class="mb-3">
                      //~ <input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
                    //~ </div>
          //~ </form>
        //~ </div>
      //~ </div>
    //~ </div>
  //~ `);
  // child = spawn('gedit', {detached: true});
  // pid = child.pid
  // console.log(pid)
  
  




});

app.post('/', function(request, response, next){
  // console.log(pid)
  // process.kill(-pid);

  console.log(request.body);
  console.log(request.body.action);
 


  
  
  if (request.body.action=="Submit") {

    try {
      fs.writeFileSync(main_dir+'tmp/wifi_ssid.txt', request.body.ssid);
      fs.writeFileSync(main_dir+'tmp/wifi_password.txt', request.body.password);
    } catch (err) {
      console.error(err);
    }

    //~ var r = String(execSync("ls -la"))
    //~ console.log(r)
    //~ response.write(r.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    //~ response.end();
    //~ process.exit()
    
    // response.write("Information received. Trying to connect ...");
    // response.end();
    response.send("Information received. Trying to connect ...");
  }
  else{
    //response.write("Operation canceled. Attempting with last configured network ...");
    //response.end();
    response.send("Operation canceled. Attempting with last configured network ...");
  }
  process.exit()


});

app.listen(8080);



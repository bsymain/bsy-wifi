



const fs = require('fs');
const { execSync, spawn } = require("child_process");


function myExec(command){
  console.log(command)
  op = String(execSync(command))
  console.log(op)
  return op
}

var wifi_list=myExec("nmcli dev wifi list")

try {
  fs.writeFileSync("tmp/wifi_list.txt" , wifi_list);
  // file written successfully
} catch (err) {
  console.error(err);
}



	myExec("nmcli conn up BSY-Hotspot")
  
  execSync("sleep 1")
  
  console.log('Setting IP tables')
  myExec("sudo ./bsy_iptable_config.sh")
  
  
  console.log('Starting Server')
  myExec("./bsy_server.sh")
  
  
  
  


    
    const netName = fs.readFileSync("tmp/wifi_ssid.txt", 'utf8');
    const netPass = fs.readFileSync("tmp/wifi_password.txt", 'utf8');


  
  

  myExec("sudo ./bsy_iptable_clear.sh")
  
  myExec("nmcli conn down BSY-Hotspot")
  execSync("sleep 3")
  
  // TODO What if there is space in name or password
  myExec("nmcli dev wifi connect "+ netName + " password " + netPass) 

	
  





const fs = require('fs');
const { execSync, spawn } = require("child_process");

const main_dir = "/home/pi/Documents/bsy-wifi/"
var tmp_dir = main_dir + "tmp/"

const conn_wait_time = 60

function myExec(command){
  console.log(command)
  try {
    op = String(execSync(command))
    console.log(op)
  }
  catch (err){ 
    op="";
    //console.log("output", err)
    console.log("sdterr",err.stderr.toString())
  }
  return op
}

function check_radio_status(){
  op = myExec("nmcli  radio wifi")
  if (op=="enabled\n"){
    radio_on = 1;
  }
  else{
    radio_on = 0;
  }
  return radio_on

}

function check_wifi_existence(){
  op = myExec("nmcli --get-value name,type  con show  | grep  802-11-wireless  |  sed '/BSY-Hotspot:/d'")
  if (op==""){
    wifi_exist = 0 ;
  }
  else{
    wifi_exist = 1 ;
  }
  return wifi_exist
}

function check_wifi_network_connection(){
  op = myExec("nmcli --get-value name,type  con show --active | grep  802-11-wireless  |  sed '/BSY-Hotspot:/d'")
  if (op==""){
    wifi_connected = 0 ;
  }
  else{
    wifi_connected = 1 ;
  }
  return wifi_connected
}

function check_hotspot_connection(){
  op = myExec("nmcli --get-value name  con show --active | grep BSY-Hotspot")
  if (op==""){
    hotspot_connected = 0 ;
  }
  else{
    hotspot_connected = 1 ;
  }
  return hotspot_connected
}


function check_domain_connection(domain){
  op = myExec("curl -Is  "+domain+" | head -n 1 | grep HTTP")
  if (op==""){
    domain_connected = 0 ;
  }
  else{
    domain_connected = 1 ;
  }
  return domain_connected
}

function wait_on_connection(time_seconds){
  for  ( i= 0;  i< time_seconds ; i++){
    if (!check_domain_connection("http://www.google.com")){
      fs.writeFileSync(tmp_dir+'connection_status.txt', '0');
      myExec("sleep 0.5")
      fs.writeFileSync(tmp_dir+'connection_status.txt', 'x');
      myExec("sleep 0.5")
      
    }
    else{
      fs.writeFileSync(tmp_dir+'connection_status.txt', '0');
      return;
    }
  }
  fs.writeFileSync(tmp_dir+'connection_status.txt', '1');
}



//~ if (! check_radio_status()){
  //~ myExec("nmcli  radio wifi on");
  //~ execSync("sleep 1")
  //~ check_radio_status()
  
//~ }

//~ console.log("WiFi Connected")
//~ console.log(check_wifi_network_connection())
//~ execSync("sleep 1")

//~ console.log("Hotspot Connected")
//~ console.log(check_hotspot_connection())

//~ console.log("Domain Connection")
//~ console.log()

function ensure_wifi_connectivity() {
    if( ! check_wifi_existence()){
      fs.writeFileSync(tmp_dir+'connection_status.txt', '1');
      setup_connection()
      wait_on_connection(conn_wait_time)
    }
    
    n_attempts = 0;

    while( ! check_domain_connection("http://www.google.com")   ){
      console.log("No internet")
      

      
        if (check_hotspot_connection()){
          console.log("Hotspot was on. Turning it off.")
          myExec("sudo " + main_dir+ "bsy_iptable_clear.sh")
          myExec("nmcli conn down BSY-Hotspot")
          wait_on_connection(conn_wait_time)
        }
        else{
          if (check_wifi_network_connection()){
            console.log("WiFi Connected but no internet")
            setup_connection()
          }
          else {
            if (! check_radio_status()){
              console.log("WiFi was off")
              myExec("nmcli  radio wifi on");
              wait_on_connection(conn_wait_time)
            }
            else {
              console.log("Power Cycling radio")
              myExec("nmcli  radio wifi off");
              myExec("sleep 3")
              myExec("nmcli  radio wifi on");
              wait_on_connection(conn_wait_time)

              n_attempts = n_attempts + 1
              
              if (n_attempts > 0){
                n_attempts = 0 ;
                fs.writeFileSync(tmp_dir+'connection_status.txt', '1');
                setup_connection()
                wait_on_connection(conn_wait_time)
              }
            }
            
        }
        
      }

    
  }
  fs.writeFileSync(tmp_dir+'connection_status.txt', '0');
  
}
while(1){
  ensure_wifi_connectivity()
  execSync("sleep 1")
}

function setup_connection(){

  // var wifi_list=myExec("nmcli dev wifi list")
  var wifi_list=myExec("nmcli --get-values ssid,SIGNAL,CHAN,BARS,RATE,CHAN,SECURITY  dev wifi list")

  try {
    fs.writeFileSync(tmp_dir+"wifi_list.txt" , wifi_list);
    // file written successfully
  } catch (err) {
    console.error(err);
  }



    myExec("nmcli conn up BSY-Hotspot")
    
    execSync("sleep 1")
    
    console.log('Setting IP tables')
    myExec("sudo " + main_dir +"./bsy_iptable_config.sh")
    
    
    console.log('Starting Server')
    myExec(main_dir + "./bsy_server.sh")
    
    
    
    


      
      const netName = fs.readFileSync(tmp_dir+"wifi_ssid.txt", 'utf8');
      const netPass = fs.readFileSync(tmp_dir+"wifi_password.txt", 'utf8');


    
    

    myExec("sudo " + main_dir + "./bsy_iptable_clear.sh")
    
    myExec("nmcli conn down BSY-Hotspot")
    execSync("sleep 3")
    
    // TODO What if there is space in name or password
    myExec("nmcli dev wifi connect '"+ netName + "' password '" + netPass+"'") 
  
}

	
  

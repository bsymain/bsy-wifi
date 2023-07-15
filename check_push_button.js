const fs = require('fs');

function check_button_press(){

    button_pressed = 0;

    fname = 'tmp/button_pressed.txt'
    if (fs.existsSync(fname)) {
      time_str = fs.readFileSync(fname, 'utf8');
      time = parseFloat(time_str);
      console.log(time);
      button_pressed = 1
      
      fs.unlinkSync(fname)
    }
    return button_pressed
}

console.log(check_button_press());

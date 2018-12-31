autowatch = 1;

var win_buf = new Buffer("window_buf");

// wavetable sample number
var len = 1024;
// total wave number
var chan = 128;

function bang(){

    // set buffer size
    win_buf.send("sizeinsamps", len);

    // square ⇆ hann
    for(var i=0; i<chan; i++){
        var check_1 = i*len/(2*chan);
        var check_2 = len - check_1;
        for(var j=0; j<len; j++){
            if(j < check_1){
                var val = 0.5 - 0.5*Math.cos(Math.PI*j/check_1);
            }
            else if(j >= check_1 && j < check_2){
                var val = 1;
            }
            else{
                var val = 0.5 - 0.5*Math.cos(2*Math.PI*((j-check_2)/(2*check_1) + 0.5));
            }
            win_buf.poke(chan-(i+1), j, val);
        }
    }
}

function wrap(x, l, u){
    return ((Math.abs(x)+l)%(u-l+1) + l);
}

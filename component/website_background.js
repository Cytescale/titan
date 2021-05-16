

const back_preset_gradient = [
     ['#ff9a9e','#fad0c4'],
     ['#a18cd1','#fbc2eb'],
     ['#fad0c4','#ffd1ff'],
     ['#ffecd2','#fcb69f'],
     ['#fbc2eb','#a6c1ee'],
     ['#a6c0fe','#f68084'],
]


export default class backgrounClass{
     selec_color = 0;
     grad_deg = 160;
     back_type = 0;
     back_image = null;
     colors_array = back_preset_gradient[Math.floor(Math.random() * back_preset_gradient.length)];
     solid_color = '#f1f1f1';
     default_value = {
          backgroundColor:'#f1f1f1',
          backgroundImage:'linear-gradient(160deg,#fff,#FDD075)',
          backgroundSize:'1em 1em',                    
     }
     constructor(){
         
     }
}
exports.driverCode = function(data){
     return(
          `
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <title>Titan Site</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
                  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700;800;900&display=swap" rel="stylesheet">
             <style>
                  .site_main_bdy_cont{
                       display: flex;
                       justify-content: center;
                       align-items: center;
                       background-color: #f5f5f5;      
                  }
                  .site_main_bdy{
                       width: 544px;
                       height: 100%;
                       overflow: hidden;
                       min-height: 100vh;
                       background-color: #fff;
                       padding-left: 22px;
                       padding-right: 22px;
                       padding-top: 22px;
                       padding-bottom: 22px;
                       border-radius: 8px;
                       box-shadow: 0px 0px 13px #e0e0e0;
        
                  }
                  ._page_element_footer_main_bdy{
                       color:#525252;
                            padding: 12px;
                            font-size: 13px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-bottom: 1px solid #e0e0e0;
                       }
                       
             </style>
          </head>
          <body>
                  <div class='site_main_bdy_cont'>
                       <div class='site_main_bdy'>
                            `+data+`
                       </div>
                  </div>
        </body>
        </html>
        
        `
     )
}
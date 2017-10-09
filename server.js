var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
 user: 'makeanability',
 database: 'makeanability',
 host: 'db.imad.hasura-app.io',
 port: '5432',
 password: process.env.DB_PASSWORD
 
};








var app = express();
app.use(morgan('combined'));




var articals={
          'artical_one':{
    title:'ARTICAL ONE',
    head:'HOME',
    content:`
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>`
    
    
    
}
          ,'artical_two':{
    title:'ARTICAL TWO',
    head:'HOME',
    content:`
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>`
    
    
    
}
           ,'artical_three':{
    title:'ARTICAL THREE',
    head:'HOME',
    content:`
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>
            <div><p>This is my first artical,its vaery blesure to post my own atrical and very thankfull to all of you</p></div>`
    
    
    
}


};
function create_template(data){
var title=data.title;
var head=data.head;
var content=data.content;

var html_template=
`
<!DocType html >
<html>
  <head>
      <title>
          ${title}
          </title>
        <link href="/ui/style.css" rel="stylesheet"/>  
  </head>
  
  <body>
       
      <div class="contain">
          <div>${head}</div><hr/>
            ${content}
  </div>
  </body>
  
</html>

`;

return html_template

}



app.get('/', function (req, res) {
  res.sendFile( 'index.html');
});

var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
    pool.query('SELECT * FROM artical',function(err,rs)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            
            res.send(JSON.stringify(rs.rows));
        }
    });
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:artical_name', function (req, res) {
    var art_name=req.params.artical_name;
  res.send(create_template(articals[art_name]));
});
app.get('/artical-2', function (req, res) {
  res.send(create_template(artical_one));
});



app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

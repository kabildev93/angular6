const express = require('express');
const path =require('path');
const app=express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

const posts = require('./server/routes/posts');
app.use(express.static(path.join(__dirname,'src')));
app.use('/posts', posts);


////
app.use("/node_modules", express.static('node_modules'));
app.use(express.static(__dirname + '/assets', { index: false }));
app.use(express.static(__dirname + '/src', { index: false }));
////

/*app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'src/index.html'))
});*/

////new
const {
    provideModuleMap
} = require('@nguniversal/module-map-ngfactory-loader');

const provider = provideModuleMap(LAZY_MODULE_MAP);

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: ServerAppModuleNgFactory,
        providers: [provider]
    })
);

app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('./src/index', {
        req: req,
        res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

///new
const port = process.env.PORT || 4600;
app.listen(port,(req,res)=>{
	console.log('Running on port' +port);

});

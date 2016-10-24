var conf = require('./config/config');
var express = require('express'),
		exp = express();
var fs = require('fs');
var bunyan = require('bunyan'),
		log = bunyan.createLogger({
				name: 'ProTo Server',
				level: conf.logLevel,
				serializers: {
					req: bunyan.stdSerializers.req,
					res: bunyan.stdSerializers.res
				}
		});
//var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var colors = require('colors');


//pages integration
exp.use(express.static(conf.wwwFolder));
//css integration
exp.use(express.static(conf.cssFolder));
//image integration
exp.use(express.static(conf.picsFolder));
//js  integration
exp.use(express.static(conf.scriptFolder));


//usefull multipurpose function
function fileListToEjs(dir, callback){
	fs.readdir(dir, function(err, files) {
		callback(files);
	});
}
function shuffle(array, callback) {
  for (var currentIndex = array.length, randomIndex,temporaryValue;
			0 !== currentIndex;) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  callback(array);
}

//Horizontal navBar button
global.TitleNavBar = ['Home' ,'Team'	  ,'Contact' ];
global.RefNavBar 	 = ['/'    ,'/people' ,'/contact'];
global.TextNavBar  = ['	  ' ,'L\'équipe','Contact' ];
global.ColorNavBar = ['black','blue'    ,'red'     ];

//redirect ProTo to wwwFolder/home.html
exp.get('/', function (req, res){
res.render('../www/home.ejs',
 					{ListDiapo : fs.readdirSync("www/diaporama"),
					 ListSlide : fs.readdirSync("www/slides"),
				 	 Title : TitleNavBar[0]
				 	});

/* FIXME : can't pass slides arguments
		var slides = fs.readdirSync("www/slides");
		fileListToEjs("www/diaporama", function(files,slides){
				res.render('../www/home.ejs', {ListDiapo : files, ListSlide : slides});
		});
*/
});

//redirect ProTo/member to wwwFolder/people.html
exp.get('/people', function (req, res){
	fileListToEjs("www/people",function(files){
		shuffle(files,function(array){
			res.render('../www/people.ejs',{ListePeople : files,
																			Title : TitleNavBar[1],
																			TitleNavBar :TitleNavBar
																		 });
		})
	})
});

//redirect to contact form
exp.get('/contact', function (req, res){
	res.render('../www/contact.ejs',{Title : TitleNavBar[2]});
});

//redirect erroneous pages to 404
exp.get('*', function (req, res){
	res.render('../www/404.ejs');
	log.warn('Demande d\'accès à page inéxistante (' + req.get('host') + req.originalUrl +
						') par : ' + req.ip);
});

//Fonction d'écoute sur conf.listenInterface en conf.listenPort
exp.listen(conf.listenPort, conf.listenInterface,function(){
	conf.info(function(fileconfig){log.debug(fileconfig)});
	log.info( ': server running using port : '
	          + colors.inverse(conf.listenPort) + ' at the interface : '
						+ colors.inverse(conf.listenInterface));
});

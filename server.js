var conf = require('./config/config');
var express = require('express'),
		exp = express();
var fs = require('fs');
var path = require('path');
var bunyan = require('bunyan'),
		log = bunyan.createLogger({
				name: 'ProTo Server',
				level: conf.logLevel,
				serializers: {
					req: bunyan.stdSerializers.req,
					res: bunyan.stdSerializers.res
				}
		});
var assert = require('assert');
var colors = require('colors');


//Static Folder
//------------------------------------------------------------------------------
exp.use(express.static(conf.wwwFolder));	 //pages integration
exp.use(express.static(conf.cssFolder));   //css integration
exp.use(express.static(conf.picsFolder));  //image integration
exp.use(express.static(conf.scriptFolder));//js  integration


//usefull multipurpose function
//------------------------------------------------------------------------------
function fileListToEjs(dir, callback){
	fs.readdir(dir, function(err, files) {
		log.debug(files);
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

//Horizontal navBar global var
//------------------------------------------------------------------------------
global.TitleNavBar = ['Home' 	,'Workflow' 	 ,'Project'		 ,'Team'		 ,'Contact'	];
global.RefNavBar 	 = ['/'    	,'/workflow'	 ,'/project' 	 ,'/people'  ,'/contact'];
global.TextNavBar  = [''     	,'Le Workflow' ,'Les projets','L\'équipe','Contact'	];
global.ColorNavBar = ['black'	,'orange'			 ,'green'			 ,'blue'     ,'red'    	];

//------------------------------------------------------------------------------
//													Router Part
//------------------------------------------------------------------------------

exp.get('/', function (req, res){
	res.render('../www/home.ejs',{ListSlide : fs.readdirSync('www/index'),
  				 											Title : TitleNavBar[0]
					 										 });
});

exp.get('/people', function (req, res){
	fileListToEjs('www/people',function(files){
		shuffle(files,function(array){
			res.render('../www/people.ejs',{ListePeople : files,
																			Title : TitleNavBar[3]
																		 });
		})
	})
});

exp.get('/contact', function (req, res){
	res.render('../www/contact.ejs',{Title : TitleNavBar[4]});
});

exp.get('/project', function (req, res){
	fileListToEjs('www/projects',function(files){
		res.render('../www/project.ejs',{ListeProject : files,
																		 ProjectPageTitle : ["Présentation","Avancement","Équipe","Partenaire"],
																	 	 Title : TitleNavBar[2]
																  	})
	})
});

exp.get('/workflow', function (req, res){
	res.render('../www/workflow.ejs', {	ListDiapo : fs.readdirSync('www/workflow'),
																	 		LogoDiapo : fs.readdirSync('www/pics/diapo-nav'),
																 	 		Title : TitleNavBar[1]
															  		})
});

exp.get('*', function (req, res){
	res.render('../www/404.ejs', {Title : '404'});
	log.warn('Demande d\'accès à page inéxistante (' + req.get('host') + req.originalUrl +
						') par : ' + req.ip);
});

//------------------------------------------------------------------------------
//										     Server Management Part
//------------------------------------------------------------------------------
exp.listen(conf.listenPort, conf.listenInterface,function(){
	conf.info(function(fileconfig){log.debug(fileconfig)});
	log.info( 'Server running using port : '
	          + colors.inverse(conf.listenPort) + ' at the interface : '
						+ colors.inverse(conf.listenInterface));
});

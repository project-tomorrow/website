var express = require('express'),
		exp = express();
var bunyan = require('bunyan'),
		log = bunyan.createLogger({
				name: 'ProTo Server',
				serializers: {
					req: bunyan.stdSerializers.req,
					res: bunyan.stdSerializers.res
				}
		});
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var colors = require('colors');

var conf = require('./config/config');

//pages integration
exp.use(express.static(conf.wwwFolder));
//css integration
exp.use(express.static(conf.cssFolder));
//image integration
exp.use(express.static(conf.picsFolder));
//js  integration
exp.use(express.static(conf.scriptFolder));

//redirect ProTo to wwwFolder/home.html
exp.get('/', function (req, res){
	res.render('../www/home.ejs');
});

//redirect ProTo/member to wwwFolder/people.html
exp.get('/', function (req, res){
	res.render('../www/home.ejs');
});

var showPeople = function(req, res, db, callback){
	log.info("Connected");
};

exp.get('/people', function (req, res){
	MongoClient.connect(config.mongoDbUrl, function(req, res, err, db) {
  	log.info("Connected correctly to the db.");
		showPeople(req, res, db, function() {
			db.close();
		});
	});

});

//redirect erroneous pages to 404
exp.get('*', function (req, res){
	res.render('../www/404.ejs');
	log.warn('Demande d\'accès à page inéxistante (' + req.get('host') + req.originalUrl +
						') par : ' + req.ip);
});

//Fonction d'écoute sur conf.listenInterface en conf.listenPort
exp.listen(conf.listenPort, conf.listenInterface,function(){
	log.info( ': server running using port : '
	          + colors.inverse(conf.listenPort) + ' at the interface : '
						+ colors.inverse(conf.listenInterface));
});

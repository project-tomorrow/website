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

//redirect kapupa.fr to wwwFolder/home.html
exp.get('/', function (req, res){
	res.render('../www/home.ejs');
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

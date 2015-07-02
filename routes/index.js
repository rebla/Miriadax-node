var express = require('express');
//Utilizamos el generador de router para gestionar las rutas concretas
var router = express.Router();


var quizController = require ('../controllers/quiz_controller');
/*********************************************/
/***** Definicion de las rutas de Quizes *****/
/*********************************************/
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/*** Autoload de comandos con :quizId ***/
/*
	quizController.load() se instala para que se ejecute antes que lo necesiten las rutas show y
	answer y solo en el caso de que path contenga :quizId, referenciando un recurso en la tabla
	Quiz de la base de datos que deba ser procesado por el controlador.

	Se instala con el método param() de express (http://expressjs.com/4x/api.html#router.param),
	para que router.param(‘quizId’, quizController.load) solo invoque quizController.load si
	existe el parámetro :quizId está en algún lugar de la cabecera HTTP (en query, body o param). 
*/
router.param('quizId', quizController.load); // autoload :quizId

router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);


/* GET Author page. */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz' });
});



// Se viene por esta ruta, renderizara la vista en la que se vera
// la pregunta con el cuadro de texto para introducir la respuesta
router.get('/quizes/question', quizController.question);
// Si viene por esta ruta, en fuuncion de la respuesta se mostrara si la respuesta ha sido correcta o no
router.get('/quizes/answer'  , quizController.answer);

module.exports = router;

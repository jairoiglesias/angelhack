
module.exports = function(app){

  // Importa modulos nativos
  var rp = require('request-promise');
  var request = require('request');

  // Custom Modules
  var db = require('./../libs/connectdb.js')()

  global.registros_novos = []

  app.get('/recupera_perguntas', function(req, res){

    var formIndex = req.query.formIndex;
  
    var Perguntas = db.model('Perguntas')

    Perguntas.find({Form:formIndex}, function(err, docs){
      if(err){
        throw err
      }
      res.send(docs);
    })

  })

  app.get('/recupera_categorias', function(req, res){

    var Categorias = db.model('Categorias')

    Categorias.find({}, function(err, docs){
      if(err){
        throw err
      }

      var temp = docs.slice(1, 20)

      res.send(temp);
    })

  })

  app.get('/', function(req, res){
    res.render('index')
  })

  app.get('/index', function(req, res){
    res.render('index')
  })

  app.get('/detalhe_startup', function(req, res){
    res.render('detalhe_startup')
  })

  app.get('/login', function(req, res){
    res.render('login')
  })

  app.get('/aceleradora', function(req, res){
    res.render('aceleradora')
  })

  app.get('/contratos', function(req, res){

    res.render('contratos')

  })

  app.get('/dashboards', function(req, res){

    res.render('dashboards')

  })

  app.get('/perguntas', function(req, res){
    res.render('perguntas')
  })

  app.get('/atendimentos_dashboard', function(req, res){

    var requestOptions = {
      uri: 'http://apigateway.ima.sp.gov.br:8080/apiman-gateway/Hackathon/api/2.0/saude/atendimentos',
      qs:{
        apikey: TOKEN_IMA,
        pagina:1,
        limite:50
      },
      json: true
    }

    rp(requestOptions).then(function(response){

      var registros = []

      response.content.forEach(function(value, index){

        // var registro = {
        //   hora: value.hora,
        //   dataAtendimento: value.dataAtendimento,
        //   dataNascimento: value.dataNascimento,
        //   sexo: value.sexo,
        //   periodo: value.periodo,
        //   localVinculo: value.localVinculo,
        //   distritoAtendimento: value.distritoAtendimento,
        //   procedimento: value.procedimento

        // }

        registros.push(registro)

      })

      res.send(registros)
    })

  })

  app.get('/atendimentos_lista', function(req, res){

    var requestOptions = {
      uri: 'http://apigateway.ima.sp.gov.br:8080/apiman-gateway/Hackathon/api/2.0/saude/atendimentos',
      qs:{
        apikey: TOKEN_IMA,
        pagina:1,
        limite:50
      },
      json: true
    }

    rp(requestOptions).then(function(response){

      // Recupera os dados da base de novos registros
      var registros = []

      global.registros_novos.forEach(function(value, index){

          var registro = {
          hora: value.hora,
          dataAtendimento: value.dataAtendimento,
          dataNascimento: value.dataNascimento,
          sexo: value.sexo,
          periodo: value.periodo,
          localVinculo: value.localVinculo,
          distritoAtendimento: value.distritoAtendimento,
          procedimento: value.procedimento

        }

        registros.push(registro)

      })

      // Recupera os dados da base de atendimentos da IMA
      response.content.forEach(function(value, index){

        var registro = {
          hora: value.hora,
          dataAtendimento: value.dataAtendimento,
          dataNascimento: value.dataNascimento,
          sexo: value.sexo,
          periodo: value.periodo,
          localVinculo: value.localVinculo,
          distritoAtendimento: value.distritoAtendimento,
          procedimento: value.procedimento

        }

        registros.push(registro)

      })

      res.send(registros)
    })

  })


  // Cria um registro de atendimento pela API

  app.get('/adiciona_atendimento', function(req, res){

    var requestBody = ''

    if(Object.keys(req.query).length == 0){

      requestBody = {
        "atividadeProfissional": "string",
        "cbo": "string",
        "codigoAtividadeProfissional": "string",
        "codigoGrupoAtendimento": "15",
        "codigoProcedimento": "string",
        "codigoSexo": "1",
        "codigoTipoAtendimento": "10",
        "dataAtendimento": "09/07/2017",
        "dataNascimento": "05/02/1997",
        "distritoAtendimento": "CENTRO",
        "distritoVinculo": "string",
        "grupoAtendimento": "string",
        "hora": "13H",
        "idade": "string",
        "localAtendimento": "string",
        "localVinculo": "HOSPITAL MARIO GATTI",
        "municipio": "string",
        "periodo": "MANHA",
        "procedimento": "CONSULTA MEDICA",
        "qtdRealizada": 1,
        "sexo": "MASCULINO",
        "tipoAtendimento": "string",
        "tipoVinculo": "string",
        "uf": "string"
      }
    }
    else{

        requestBody = {
        "atividadeProfissional": "string",
        "cbo": "string",
        "codigoAtividadeProfissional": "string",
        "codigoGrupoAtendimento": "15",
        "codigoProcedimento": "string",
        "codigoSexo": "1",
        "codigoTipoAtendimento": "10",
        "dataAtendimento": "09/07/2017",
        "dataNascimento": "29/11/1989",
        "distritoAtendimento": "string",
        "distritoVinculo": "string",
        "grupoAtendimento": "string",
        "hora": "13H",
        "idade": "string",
        "localAtendimento": "string",
        "localVinculo": "string",
        "municipio": "string",
        "periodo": "string",
        "procedimento": "string",
        "qtdRealizada": 1,
        "sexo": "M",
        "tipoAtendimento": "string",
        "tipoVinculo": "string",
        "uf": "string"
      }

    }

    var requestOptions = {
      method: 'POST',
      uri: 'http://apigateway.ima.sp.gov.br:8080/apiman-gateway/Hackathon/api/2.0/saude/atendimentos',
      qs:{
        apikey: TOKEN_IMA,
      },
      body: requestBody,
      json: true
    }

    rp(requestOptions).then(function(response){
      
      console.log('RESULTADO DO ENVIO DA TENTATIVA DE CADASTRO DE ATENDIMENTO')
      console.log('===============================================================================')
      console.log(response)

      global.registros_novos.push(requestBody)

      console.log(global.registros_novos)

      res.send(response)

    })

  })

}

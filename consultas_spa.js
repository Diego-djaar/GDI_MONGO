//*************************checklist***************

//use - ok
//find - ok
//size - ok
//aggregate - ok
//match - ok
//project - ok
//GTE - ok
//group - ok
//sum - ok
//countdocuments - ok
//max - ok
//avg - ok
//exists
//sort - ok
//limit - ok
//where - ok
//mapreduce ok
//function ok
//pretty - ok
//all - ok
//set - ok
//text - ok
//search - ok
//filter - ok
//updateone - ok
//insertone - ok
//renamecollection - ok
//cond - ok
//lookup - ok
//findone - ok
//addtoset - ok

//****************************************************/

// quantidade de agendamentos para um serviço
db.appointments.countDocuments({ serviceId: "1" });

// encontrar o serviço mais caro
db.services.find({}, { name: 1 }).sort({ price: -1 }).limit(1);

// calcular a media dos preços dos serviços
db.services.aggregate([{ $group: { _id: null, averagePrice: { $avg: "$price" } } }]).forEach(printjson);

// serviços mais caros ou igual a 50 reais
db.services.find({ price: { $gte: 50 } }).forEach(printjson);

// profissional com o maior numero de serviços oferecidos
db.professionals.aggregate([{ $project: { name: 1, numberOfServices: { $size: "$services" } } },    { $sort: { numberOfServices: -1 } },    { $limit: 1 },  ]).forEach(printjson);

// buscar dados de um cliente especifico
db.clients.findOne({ clientId: "c1" });

// uso de insertone para insertar novo cliente
db.clients.insertOne({ clientId: "c4", name: "Fernanda Lima", email: "fernanda.lima@example.com", phones: { ddd: 81, numero: [21999999999] },});

// uso de updateone para atualizar a descrição de um serviço
db.services.updateOne(  { serviceId: "1" },  {    $set: { description: "Corte de cabelo unissex, inclui lavagem e secagem." },  });

// usa search e text para pegar uma descrição de um serviço q contenha uma palavra especifica
db.services.createIndex({ description: "text" }); //cria um indice p poder usar $text

// encontra serviços relacionados a cabelo ** usar após o comando anterior
db.services.find({ $text: { $search: "cabelo" } }).pretty();

// preço maximo de um serviço
db.services.aggregate([{ $group: { _id: null, maxPrice: { $max: "$price" } } },]);

// uso de all para retornar os dados dos profissionais que oferecem ambos serviços 1 e 2
db.professionals.find({ services: { $all: ["1", "2"] } });

// retorna informações sobre um agendamento espfecifico e sobre o cliente que agendou
db.appointments.aggregate([{ $match: { serviceId: "2", status: "agendado" } },{$lookup: {from: "clients",localField: "clientId",foreignField: "clientId",as: "clientDetails",},},{  $lookup: {    from: "services",    localField: "serviceId",    foreignField: "serviceId",    as: "serviceDetails",  },},{  $unwind: "$serviceDetails",},{  $project: {    _id: 1,    clientId: 1,    serviceId: 1,    status: 1,    date: 1,    clientDetails: 1,    serviceName: "$serviceDetails.name",  },},]);

// soma dos preços de serviços especificos
db.services.aggregate([{ $match: { serviceId: { $in: ["1", "3"] }, }, }, { $group: { _id: null, totalPrice: { $sum: "$price" }, }, },]);

// serviços dos agendamentos para Maio (index 0)
db.appointments.find({ $where: function () { let date = new Date(0); date.setUTCMilliseconds(this.date); return date.getMonth() == 5 - 1 } });

// pagamento total de cada cliente
db.appointments.mapReduce(function () { emit(this.clientId, this.price); }, function (key, values) { return Array.sum(values) }, { query: {}, out: "pagamento" })
// resultado
db.pagamento.find()

// retornar clientes com telefones de DDD 81
db.clients.aggregate([{ $project: { _id: 0, clientId: 1, phones: { $filter: { input: "$phones", as: "phone", cond: { $eq: ["$$phone.ddd", 81] } } } } }])

// retornar bônus de 300 se o salário é 2000 ou menor, 200 se for maior
db.professionals.aggregate([{ $project: { _id:0,serviceId: 1, bonus: { $cond: [{ $gt: ["$salary", 2000] }, 200, 300] } } }])

// renamecollection para renomear appointments para agendamentos *****rodar no final******
db.appointments.renameCollection("agendamentos");

// adiciona o phone { ddd: 81, numero: 21980023759 } ao client c2
db.clients.updateOne({ clientId: "c2" }, { $addToSet: { phones: { ddd: 81, numero: 21980023759 } } })

//remoção de uma coleção *****rodar no final******
db.agendamentos.drop();

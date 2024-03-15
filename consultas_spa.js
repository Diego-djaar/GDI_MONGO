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
//where
//mapreduce
//function
//pretty - ok
//all - ok
//set - ok
//text - ok
//search - ok
//filter
//updateone - ok
//insertone - ok
//renamecollection - ok
//cond
//lookup - ok
//findone - ok
//addtoset

//****************************************************/

// quantidade de agendamentos para um serviço

var count = db.appointments.countDocuments({ serviceId: "1" });
print("Número de agendamentos para o serviço 1:", count);

// encontrar o serviço mais caro
var mostExpensiveService = db.services.find().sort({ price: -1 }).limit(1);
printjson("Serviço mais caro: ", mostExpensiveService);

// calcular a media dos preços
db.services
  .aggregate([
    {
      $group: {
        _id: null,
        averagePrice: { $avg: "$price" },
      },
    },
  ])
  .forEach(printjson);

// serviços mais caros ou igual a 50

db.services.find({ price: { $gte: 50 } }).forEach(printjson);

// profissional com o maior numero de serviços oferecidos

db.professionals
  .aggregate([
    {
      $project: {
        name: 1,
        numberOfServices: { $size: "$services" },
      },
    },
    {
      $sort: { numberOfServices: -1 },
    },
    {
      $limit: 1,
    },
  ])
  .forEach(printjson);

// buscar dados de um cliente especifico

var client = db.clients.findOne({ clientId: "c1" });
printjson(client);

// uso de insertone para insertar novo cliente

db.clients.insertOne({
  clientId: "c4",
  name: "Fernanda Lima",
  email: "fernanda.lima@example.com",
  phones: [21999999999],
});

//updateone

db.services.updateOne(
  { serviceId: "1" },
  {
    $set: { description: "Corte de cabelo unissex, inclui lavagem e secagem." },
  }
);

// usa search e text para pegar uma descrição de um serviço q contenha uma palavra especifica

db.services.createIndex({ description: "text" }); //cria um indice p poder usar $text

db.services.find({ $text: { $search: "cabelo" } }).pretty();

//preço maximo de um serviço

db.services.aggregate([
  {
    $group: {
      _id: null,
      maxPrice: { $max: "$price" },
    },
  },
]);

// uso de all / dados dos profissionais que oferecem ambos serviços 1 e 2
db.professionals.find({
  services: { $all: ["1", "2"] },
});

// retorna informações sobre um agendamento espfecifico e sobre o cliente que agendou
db.appointments.aggregate([
  {
    $match: {
      serviceId: "2",
      status: "agendado",
    },
  },
  {
    $lookup: {
      from: "clients",
      localField: "clientId",
      foreignField: "clientId",
      as: "clientDetails",
    },
  },
  {
    $lookup: {
      from: "services",
      localField: "serviceId",
      foreignField: "serviceId",
      as: "serviceDetails",
    },
  },
  {
    $unwind: "$serviceDetails",
  },
  {
    $project: {
      _id: 1,
      clientId: 1,
      serviceId: 1,
      status: 1,
      date: 1,
      clientDetails: 1,
      serviceName: "$serviceDetails.name",
    },
  },
]);

//soma dos preços de serviços especificos

db.services.aggregate([
  {
    $match: {
      serviceId: { $in: ["1", "3"] }, // Filtra para incluir apenas os serviços de interesse
    },
  },
  {
    $group: {
      _id: null, // Agrupa todos os documentos selecionados
      totalPrice: { $sum: "$price" }, // Calcula a soma dos preços
    },
  },
]);

//renamecollection

db.appointments.renameCollection("agendamentos");

//remoção de uma coleção *****rodar no final******
db.appointments.drop();

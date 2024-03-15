//criação do banco de dados e das suas coleções

//use spa 

//db.createCollection("services")
//db.createCollection("professionals")
//db.createCollection("clients")
//db.createCollection("appointments")

//inserções em serviços
db.services.insertMany([
  {
    serviceId: "1",
    name: "Corte de Cabelo",
    description: "Corte e estilização de cabelo.",
    duration: 30,
    price: 50.00
  },
  {
    serviceId: "2",
    name: "Manicure",
    description: "Cuidados com as unhas das mãos, inclui esmaltação.",
    duration: 45,
    price: 35.00
  },
  {
    serviceId: "3",
    name: "Massagem Relaxante",
    description: "Massagem corporal para aliviar tensões e relaxar.",
    duration: 60,
    price: 80.00
  },
  {
    serviceId: "4",
    name: "Limpeza de Pele",
    description: "Limpeza profunda da pele com extração de impurezas.",
    duration: 90,
    price: 120.00
  }
]);

// Inserção na Coleção de Profissionais 
db.professionals.insertMany([
  {
    professionalId: "p1",
    name: "Maria Silva",
    services: ["1", "2"],
    availability: "Segunda a Sexta, 9h às 18h"
  },
  {
    professionalId: "p2",
    name: "João Pereira",
    services: ["1", "3"],
    availability: "Terça a Sábado, 10h às 19h"
  },

  {
    professionalId: "p3",
    name: "Clara Machado",
    services: ["2", "4"], 
    availability: "Quarta a Domingo, 12h às 20h"
  }
]);

// Inserção na Coleção de Clientes 
db.clients.insertMany([
  {
    clientId: "c1",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    phone: "11987654321"
  },
  {
    clientId: "c2",
    name: "Lucas Martins",
    email: "lucas.martins@example.com",
    phone: "21987654321"
  },

  {
    clientId: "c3",
    name: "Rafael Souza",
    email: "rafael.souza@example.com",
    phone: "31987654321"
  }
]);

// Inserção na Coleção de Agendamentos 
db.appointments.insertMany([
  {
    appointmentId: "a1",
    clientId: "c1",
    professionalId: "p1",
    serviceId: "2",
    date: new Date("2024-04-15T14:00:00Z"),
    status: "agendado"
  },
  {
    appointmentId: "a2",
    clientId: "c2",
    professionalId: "p2",
    serviceId: "3",
    date: new Date("2024-04-20T16:00:00Z"),
    status: "agendado"
  },

  {
    appointmentId: "a3",
    clientId: "c3",
    professionalId: "p3",
    serviceId: "4",
    date: new Date("2024-05-01T10:00:00Z"),
    status: "agendado"
  },
  {
    appointmentId: "a4",
    clientId: "c1",
    professionalId: "p2",
    serviceId: "1",
    date: new Date("2024-05-05T15:00:00Z"),
    status: "agendado"
  }
]);


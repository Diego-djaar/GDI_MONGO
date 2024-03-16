# Projeto de banco de dados em MongoDB para o projeto da disciplina de GDI

## Execução:

### Dependências:

<p>Instalar o MongoDB</p>


### Para Carregar a base de dados:


<p>a. Execute o Mongod</p>

<p>b. Execute o Mongo</p>

<p>c. Execute os comandos: </p>

> use spa
>
> <p></p>
> load("SPA.js")

### Para rodar as consultas:

<p>Copie a consulta do arquivo consultas_spa.js</p>
<p>Rode no terminal do mongo</p>

## Descrição do Mundo Real

<p>
A sigla SPA vem do latim e significa "cura pela água" ou "saúde pela água". Se utilizavam fontes termais para prover relaxamento, bem-estar e,
supostamente, propriedades curativas.
</p>
<p>
Atualmente, SPAs é um estabelecimento comercial bastante difundido nas cidades, que oferece aos seus clientes tratamentos para:
</p>
<li>Saúde</li>
<li>Beleza</li>
<li>Bem estar</li>
<p></p>
<p>
E, também, serviços de
</p>
<li>Massagens</li>
<li>Saunas</li>
<li>Yoga e meditação</li>

## Objetivos da Aplicação

<p>
A aplicação de gerenciamento de banco de dados tem por objetivo auxiliar na administração geral de um SPA ao permitir que sejam feitos registros de todos os serviços realizados na unidade, seus profissionais, clientes e agendamentos, a fim de melhor dimensionar e gerir os recursos disponíveis.
</p>

## Descrição Geral:

### Serviços:

#### Representam todos os serviços ofertados pelo SPA

Atributos:

<li>serviceId: string (o identificador do serviço)</li>
<li>name: string (nome do serviço)</li>
<li>description: string (descrição do serviço)</li>
<li>duration: number (duração do serviço em minutos)</li>
<li>price: number (preço do serviço em reais)</li>

### Profissionais:

#### Representam todos os funcionários que trabalham para o SPA

Atributos:

<li>professionalId: string (o identificador do profissional)</li>
<li>name: string (nome do profissional)</li>
<li>services: list[string] (serviços em que o profissional trabalha, identificados pelo serviceId)</li>
<li>availability: number (descrição da disponibilidade do profissional)</li>
<li>salary: number (salário do profissional em reais)</li>

### Clients:

#### Representam os clientes que recebem os serviços do SPA

Atributos:

<li>cleintId: string (o identificador do cliente)</li>
<li>name: string (nome do profissional)</li>
<li>email: string (email do cliente)</li>
<li>phones: list[{ddd: number, numero: number}] (telefones de contato do cliente)</li>

### Appointments:

#### Representam os agendamentos realizados por clientes

<li>appointmentId: string (o identificador do agenfamento)</li>
<li>cleintId: string (o identificador do cliente realizando o agendamento)</li>
<li>professionalId: string (o identificador do profissional que vai realizar o serviço agendado)</li>
<li>serviceId: string (o identificador do serviço agendado)</li>
<li>date: Date (a data que será realizado o serviço agendado)</li>
<li>status: string (o estado atual do agendamento)</li>
<li>price: number (valor total em reais)</li>

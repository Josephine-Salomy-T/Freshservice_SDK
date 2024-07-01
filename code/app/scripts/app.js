
document.addEventListener('DOMContentLoaded', function() {
  let client;
  
  app.initialized()
    .then(function(_client) {
      client = _client;
      console.log("App initialized");

      client.events.on("app.activated", function() {
        console.log("App activated");
        let tableDiv=document.getElementById("tableDiv");
        let ticketDiv=document.getElementById("ticketDiv");
        //const listAllTickets = document.querySelector('#listAllTickets');
        getRequestor(client,tableDiv);
        createTicket(client,ticketDiv);

      });
    })
    })
    .catch(function(error) {
      console.error('Error initializing app:', error);
    });


async function getRequestor(client,tableDiv){
  let getRequestor=document.getElementById("getRequestor");
  getRequestor.addEventListener("click",function(){
    tableDiv.style.display="block";
    ticketDiv.style.display="none";
    client.request.invoke("onlistAllRequesters",{})
    .then(function(response) {
      // console.log("RESPONSE FROM APP>JS",response)
      
      let requestersData = JSON.parse(response.response.response);
      let requesters=requestersData.requesters;
      //console.log("RESPONSE FROM APP>JS",requesters)

      
      
      tableDiv.innerHTML = '';
      let header=document.createElement('tr');
      header.innerHTML=`
      <th>Name</th>
          <th>ID</th>
          <th>Email</th>`;
        tableDiv.appendChild(header);
      // Display tickets
      requesters.forEach(requester => {
        let requesterItem = document.createElement('tr');
        requesterItem.innerHTML = `
          <td>${requester.first_name}</td>
          <td>${requester.id}</td>
          <td> ${requester.primary_email}</td>
        `;
        tableDiv.appendChild(requesterItem);
    
      });
      })
    })
    .catch(function(error) {
      console.error('Error fetching tickets:', error);
    });
    
}



async function createTicket(client,ticketDiv){
 let createTicketbtn=document.getElementById("createTicket");
 createTicketbtn.addEventListener("click",function(){
  tableDiv.style.display="none";
  ticketDiv.style.display="block";
  
  var options={
      "description": "Details about the issue...",
      "subject": "Support Needed...",
      "email": "tom@outerspace.com",
      "priority": 1,
      "status": 2,
      "requester_id": 29001640418,
      "phone": "4564",  // Ensure phone is a string
      "email": "a@gmail.com"
  };
  client.request.invoke("oncreateTicket",{data:options})
  .then(function(response) {
    let ticketData = JSON.parse(response.response.response);
      let  tickets= ticketData.ticket;
      //console.log("RESPONSE FROM APP>JS",requesters)

      
      ticketDiv.innerHTML = '';
      
      ticketDiv.innerHTML=`
      <h4>Ticket Created</h4>
      <p>Ticket ID: ${tickets.id}</p>
      <p>Subject : ${tickets.subject}</p>
      <p>Description : ${tickets.description}</p>

        `;
        let tktid=tickets.id;
        
        createNotes(client,tktid);
        
      
  })
 
 .catch(function(error) {
  console.error('Error fetching tickets:', error);
});
});
}

async function createNotes(client,tktid){
   var options={
       
       "body":"hello"
   };
   client.request.invoke("oncreateNote",{data: { ticket_id: tktid, options } })
   .then(function(response) {
       console.log("NOTE ADDED SUCCESSFULLY");

   })
  
  .catch(function(error) {
   console.error('Error fetching tickets:', error);
 });
 }
 

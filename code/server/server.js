exports = {
  onlistAllRequesters: async function () {
    try {
      const result = await $request.invokeTemplate('listAllRequesters');
      console.log('listAllRequesters:', JSON.stringify(result.response));
      renderData(null, result); // Assuming renderData is defined elsewhere
    } catch (error) {
      console.error('Error fetching tickets:', error);
      renderData(error, null);
    }
  },
  oncreateTicket: async function (args) {
    try {
      const ticketPayload = args.data;
      const result = await $request.invokeTemplate('createTicket', { body: JSON.stringify(ticketPayload) });
      console.log(' ticket created', JSON.stringify(result.response));
      renderData(null, result); // Assuming renderData is defined elsewhere
    } catch (error) {
      console.error('Error fetching tickets:', error);
      renderData(error, null);
    }
  },
  oncreateNote: async function (args) {
    try {
      const { ticket_id, options } = args.data;
      const result = await $request.invokeTemplate('createNote', { 
        context: { 
          "ticket_id": ticket_id 
   },
        body: JSON.stringify(options) });
      console.log(' note created', JSON.stringify(result.response));
      renderData(null, result); // Assuming renderData is defined elsewhere
    } catch (error) {
      console.error('Error creating note:', error);
      renderData(error, null);
    }
  }
};

function send(request, reply) {
  console.log('Send called')
  if (request.result) {
    reply(request.result);
  } else {
    reply('no result found');
  }
}

export default {
  send
};

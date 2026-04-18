const items = [];

module.exports = async function (context, req) {
  context.res = {
    body: items,
    headers: { 'Content-Type': 'application/json' }
  };
};
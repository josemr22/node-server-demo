global.items = global.items || [];

module.exports = async function (context, req) {
  const item = req.body;
  
  if (!item || !item.name) {
    context.res = {
      status: 400,
      body: { error: 'name is required' }
    };
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    name: item.name,
    createdAt: new Date().toISOString()
  };

  global.items.push(newItem);

  context.res = {
    body: newItem,
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  };
};
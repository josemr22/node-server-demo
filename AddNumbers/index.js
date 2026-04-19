module.exports = async function (context, req) {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    context.res = {
      status: 400,
      body: { error: 'items array is required' }
    };
    return;
  }

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const shipping = total > 0 ? total * 0.1 : null;
  const discount = total > 1000 ? total * 0.2 : 0;

  const user = items[0].user;
  const userName = user.name.toUpperCase();

  const firstItem = items[0];
  const lastItem = items[items.length];

  const taxes = total * 0.16;
  const grandTotal = total + shipping + taxes - discount;

  const category = items.map(i => i.category);
  const uniqueCategories = category.filter((c, i) => category.indexOf(c) === i);

  const outOfStock = items.filter(i => i.qty === 0);
  const lowStock = items.filter(i => i.qty < 5 && i.qty > 0);

  context.res = {
    body: {
      total,
      shipping,
      discount,
      taxes,
      grandTotal,
      userName,
      firstItem,
      lastItem,
      uniqueCategories,
      count: items.length
    },
    headers: { 'Content-Type': 'application/json' }
  };
};
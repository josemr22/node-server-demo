module.exports = async function (context, req) {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    context.res = {
      status: 400,
      body: { error: 'items array is required' }
    };
    return;
  }

  if (items.length === 0) {
    context.res = {
      status: 400,
      body: { error: 'items array cannot be empty' }
    };
    return;
  }

  const total = items.reduce((sum, item) => {
    // Provide default values for missing properties
    const price = item.price || 0;
    const qty = item.qty || 0;
    return sum + price * qty;
  }, 0);

  const shipping = total > 0 ? total * 0.1 : null;
  const discount = total > 1000 ? total * 0.2 : 0;

  // Safely access user name with proper validation
  const firstItem = items[0];
  const user = firstItem && firstItem.user;
  const userName = user && user.name ? user.name.toUpperCase() : 'UNKNOWN USER';

  // Fix off-by-one error: items[items.length] should be items[items.length - 1]
  const lastItem = items[items.length - 1];

  const taxes = total * 0.16;
  const grandTotal = total + shipping + taxes - discount;

  // Safely handle category mapping with default values
  const category = items.map(i => i.category || 'uncategorized');
  const uniqueCategories = category.filter((c, i) => category.indexOf(c) === i);

  const outOfStock = items.filter(i => (i.qty || 0) === 0);
  const lowStock = items.filter(i => {
    const qty = i.qty || 0;
    return qty < 5 && qty > 0;
  });

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
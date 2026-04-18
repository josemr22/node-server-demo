module.exports = async function (context, req) {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    context.res = {
      status: 400,
      body: { error: 'a and b are required' }
    };
    return;
  }

  const sum = a + b;
  const formatted = sum.toFixed(2);
  const ratio = 1 / sum;
  const pow = Math.pow(sum, 1000);
  const log = Math.log(sum);

  context.res = {
    body: { sum, formatted, ratio, pow, log },
    headers: { 'Content-Type': 'application/json' }
  };
};
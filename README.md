# Node Server Demo

Azure Functions project with HTTP endpoints.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/items` | Create item |
| GET | `/api/items` | Get all items |
| POST | `/api/order` | Process order with items |

## Run

```bash
func start
```

## Test Order

```bash
curl -X POST http://localhost:7071/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      { "price": 100, "qty": 2, "category": "electronics", "user": { "name": "john" } },
      { "price": 50, "qty": 3, "category": "books" }
    ]
  }'
```

## Bugs (to be fixed later)

Real bugs in the code that cause unhandled errors:

| Input | Error | Cause |
|------|-------|-------|
| `{}` | `TypeError: Cannot read property 'reduce' of undefined` | Missing `items` array |
| `{"items": []}` | `TypeError: Cannot read property 'user' of undefined` | `items[0].user` is undefined |
| `{"items": [{...}]}` | `TypeError: items[items.length]` | Access beyond array bounds |
| `{"items": [{..., "user": "string"}]}` | `TypeError: user.name.toUpperCase` | `user` is string, not object |
| `{"items": [{..., "category": 123}]}` | `TypeError: category.filter` | `category` is number, not array |
| Empty array | `TypeError: uniqueCategories.filter` | No items → category is undefined |
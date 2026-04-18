# Node Server Demo

Azure Functions project with HTTP endpoints.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/items` | Create item |
| GET | `/api/items` | Get all items |
| POST | `/api/add` | Add two numbers |

## Run

```bash
func start
```

## Test Add Numbers

```bash
curl -X POST http://localhost:7071/api/add \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'
```

## Error Scenarios (for App Insights testing)

These intentionally cause unhandled errors to trigger Azure Monitor alerts:

| Input | Error |
|------|-------|
| `{"a": "5", "b": 3}` | `TypeError: "53".toFixed is not a function` (string concatenation) |
| `{"a": 0, "b": 0}` | `RangeError: 1/0` - division by zero |
| `{"a": -5, "b": 0}` | `RangeError: Math.log(-5)` - logarithm of negative |
| `{"a": 1000, "b": 1000}` | `RangeError: Math.pow(2000, 1000)` - exponent overflow |
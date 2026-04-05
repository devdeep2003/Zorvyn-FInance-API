# Finance API — Zorvyn

A role-based financial records management REST API built with Express.js, DrizzleORM, NeonDB, JWT authentication, and AI-powered insights using Groq.

---

## Links

GitHub Repository → https://github.com/devdeep2003/Zorvyn-FInance-API

Postman Collection → https://www.postman.com/devdeep2003/workspace/finance-api/collection/28147810-ff91088c-3d2c-4d85-862a-7e48d3c10758?action=share&creator=28147810

---

## Tech Stack

- Express.js — Web framework
- NeonDB (PostgreSQL) — Database
- DrizzleORM — ORM and query builder
- JWT — Authentication
- bcryptjs — Password hashing
- Groq (LLaMA 3.3 70B) — AI insights generation
- CORS — Cross-origin support

---

## Project Structure

```
FINANCE-API/
├── config/
│   └── db.js                           # NeonDB + Drizzle connection
├── controllers/
│   ├── auth.controller.js              # Login
│   ├── dashboard.controller.js         # Dashboard summaries
│   ├── insights.controller.js          # AI weekly/monthly insights
│   ├── records.controller.js           # Records CRUD + Filter
│   └── users.controller.js             # User CRUD
├── drizzle/                            # Migration files
├── middlewares/
│   ├── authenticateUser.middleware.js  # JWT verification
│   └── authorize.middleware.js         # Role based access control
├── models/
│   └── db.schema.js                    # Drizzle table schemas
├── routes/
│   ├── auth.routes.js
│   ├── dashboard.routes.js
│   ├── insights.routes.js
│   ├── records.routes.js
│   └── users.route.js
├── utils/
│   ├── groq.genai.model.js             # Groq model integration
│   ├── hashFunctions.js                # bcrypt hash and compare
│   ├── jwtFunctions.js                 # generate and verify token
│   ├── prompts.js                      # AI prompt templates
│   └── roles.js                        # Role constants
├── .env
├── drizzle.config.js
├── package.json
└── server.js
```

---

## Database Schema

### Users Table

- id — serial, primary key
- name — text, not null
- email — text, unique
- password — text, hashed
- role — text, one of viewer / analyst / admin
- is_active — boolean, default true

### Records Table

- r_id — serial, primary key
- email — text, owner's email
- amount — numeric, transaction amount
- type_of_transaction — text, income or expense
- category — text, e.g. food, rent, salary
- date — timestamp, default now
- description — text, notes about the record

---

## Roles and Permissions

Viewer
- Can view dashboard (total income, expenses, balance, category totals, recent activity)
- Cannot access records or insights

Analyst
- Can view all records
- Can filter records
- Can access AI weekly and monthly insights
- Cannot create, update, or delete records
- Cannot manage users

Admin
- Full access to everything
- Can create, update, delete records
- Can create, update, delete users
- Can assign roles to users
- Can access records and insights

Note: Dashboard is intentionally restricted to viewers only. Analysts and admins are expected to use the records and insights endpoints for deeper data access.

---

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/devdeep2003/Zorvyn-FInance-API
cd Zorvyn-FInance-API
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root
```env
PORT=4000
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

4. Run migrations
```bash
npm run db:generate
npm run db:migrate
```

5. Start the server
```bash
npm run dev
```

---

## API Reference

### Auth

POST /api/auth/login — Public
Login with email and password, returns JWT token.

Request body: (Admin : Test Credential)
```json
{
  "email": "deep@gmail.com",
  "password": "deep1234"
}
```

Response:
```json
{
  "message": "Login Successful",
  "jwtToken": "eyJhbGci...",
  "data": {
    "id": 1,
    "name": "Deep",
    "email": "deep@gmail.com",
    "role": "admin",
    "is_active": true
  }
}
```

Request body: (Viewer : Test Credential)
```json
{
  "email": "anamika@gmail.com",
  "password": "12345678"
}
```

Response:
```json
{
  "message": "Login Successful",
  "jwtToken": "eyJhbGci...",
  "data": {
    "id": 1,
    "name": "Anamika",
    "email": "anamika@gmail.com",
    "role": "viewer",
    "is_active": true
  }
}
```

Request body: (Analyst : Test Credential)
```json
{
  "email": "ramesh@gmail.com",
  "password": "12345678"
}
```

Response:
```json
{
  "message": "Login Successful",
  "jwtToken": "eyJhbGci...",
  "data": {
    "id": 1,
    "name": "Ramesh",
    "email": "ramesh@gmail.com",
    "role": "analyst",
    "is_active": true
  }
}
```

---

### Users
All routes require Authorization: Bearer token header. Admin only.

POST /api/users/create-user — Create a new user
PATCH /api/users/update-user/:id — Update user details or role
DELETE /api/users/delete-user/:id — Delete a user

Request body for create:
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456",
  "role": "analyst"
}
```

---

### Records
All routes require Authorization: Bearer token header.

GET /api/records/view-records — analyst, admin — Get all records
GET /api/records/filtered-records — analyst, admin — Filter records by query params
POST /api/records/create-record — admin — Create a new record
PATCH /api/records/update-record/:r_id — admin — Update a record
DELETE /api/records/delete-record/:r_id — admin — Delete a record

Request body for create:
```json
{
  "email": "john@gmail.com",
  "amount": 5000,
  "type_of_transaction": "income",
  "category": "salary",
  "description": "Monthly salary"
}
```

Filter query params:
```
/api/records/filtered-records?type_of_transaction=income
/api/records/filtered-records?category=food
/api/records/filtered-records?from=2024-01-01&to=2024-12-31
/api/records/filtered-records?type_of_transaction=expense&category=rent
```

---

### Dashboard
All routes require Authorization: Bearer token header. Viewer only.

GET /api/dashboard/total-income — Get total income
GET /api/dashboard/total-expense — Get total expenses
GET /api/dashboard/net-balance — Get net balance
GET /api/dashboard/category-wise-totals — Get totals grouped by category
GET /api/dashboard/recent-activity — Get last 5 transactions

Sample response for net balance:
```json
{
  "message": "Net balance fetched",
  "data": 25000.00
}
```

Sample response for category wise totals:
```json
{
  "message": "Category wise totals fetched",
  "data": [
    { "category": "food", "total": "3500.00" },
    { "category": "rent", "total": "15000.00" },
    { "category": "salary", "total": "50000.00" }
  ]
}
```

---

### Insights
All routes require Authorization: Bearer token header. Analyst and admin only.

GET /api/insights/weekly-insights?email=john@gmail.com — AI generated weekly trend report
GET /api/insights/monthly-insights?email=john@gmail.com — AI generated monthly trend report

Sample response:
```json
{
  "message": "Weekly insights generated successfully",
  "email": "john@gmail.com",
  "data": "1. WEEKLY SUMMARY\n- Total income: 50000\n- Total expenses: 18500\n- Net savings: 31500\n..."
}
```

---

## How Authentication Works

1. Admin creates users via POST /api/users/create-user
2. User logs in via POST /api/auth/login
3. Server returns a JWT token
4. User sends the token in every request header as: Authorization: Bearer token
5. authenticateUser middleware verifies the token
6. authorize middleware checks the role
7. Controller runs only if both pass

---

## Error Responses

- 400 — Bad request, missing or invalid fields
- 401 — Unauthorized, invalid or missing token
- 403 — Forbidden, role not allowed to perform this action
- 404 — Resource not found
- 500 — Internal server error

---

## Assumptions and Tradeoffs

- Admin creates all users manually. There is no public registration to keep the system controlled.
- Records are linked to users by email rather than a foreign key userId for simplicity.
- Dashboard is scoped to viewer role only. Analysts and admins use records and insights endpoints instead.
- Groq with LLaMA 3.3 70B is used for AI insights instead of Gemini due to free tier quota limitations on Google AI Studio.
- Records are hard deleted. Soft delete was not implemented to keep the schema simple.
- No pagination is implemented on record listing endpoints.

---

## Scripts

```bash
npm run dev          # Start server with hot reload
npm run db:generate  # Generate migration files from schema
npm run db:migrate   # Run migrations on NeonDB
```

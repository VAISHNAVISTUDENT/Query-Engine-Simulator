# Mini Data Query Simulation Engine  

## Overview  
This project is a lightweight backend service that simulates a simplified version of a Gen AI Analytics data query engine. It processes natural language queries, explains query breakdowns, and validates query feasibility.

Deployed Link: [https://query-engine-simulator.onrender.com](https://query-engine-simulator.onrender.com)

## Features  
- **Natural Language Query Processing**: Converts user queries into pseudo-SQL.
- **Query Breakdown**: Explains intent, entities, and conditions.
- **Query Validation**: Validates the query against a mock database schema.
- **Lightweight Authentication**: Secures endpoints with a basic API key.

## Tech Stack  
- **Backend Framework**: Node.js with Express.js  
- **Database**: In-memory mock database  
- **Deployment**: Render (Live at [query-engine-simulator.onrender.com](https://query-engine-simulator.onrender.com))

---

## API Documentation  

### 1. `/query` – Convert Natural Language to Pseudo-SQL  
**Endpoint:** `POST /query`  
**Request Body:**  
```json
{
  "query": "Show me user registrations in March"
}

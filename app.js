const express = require('express');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index.ejs', { username: 'Guest' });
});
const mockDatabase = {
  tables: {
    users: ['id', 'name', 'email', 'registration_date'],
    sales: ['id', 'amount', 'year'],
    products: ['id', 'name', 'price']
  }
};

function mockTranslateQuery(query) {
    if (query.toLowerCase().includes('sales')) {
      return "SELECT SUM(amount) FROM sales WHERE year = 2023";
    }
    if (query.toLowerCase().includes('profit')) {
        return "SELECT PROFIT(amount) FROM profit WHERE year = 2023";
      } // this is modifiable field
    return "SELECT * FROM users";
  }
function explainQuery(query) {
    return {
      Retrieve: query.includes('sales') ? 'Retrieve sales data' : 'Retrieve user data',
      Table: query.includes('sales') ? ['sales'] : ['users'],
      conditions: query.includes('March') ? ["registration_date BETWEEN '2025-03-01' AND '2025-03-31'"] : [""],
      translated_query: mockTranslateQuery(query)
    };
  }

function validateQuery(query) {
    const validTables = Object.keys(mockDatabase.tables);
    const valid = validTables.some(table => query.toLowerCase().includes(table));
    return {
        valid,
        message: valid ? 'Query validated successfully' : 'Invalid table referenced in query'
    };
    }

app.post('/query', (req, res) => {
  const { query } = req.body;
  const translatedQuery = mockTranslateQuery(query);
  res.json({ result: translatedQuery });
});

app.post('/explain', (req, res) => {
  const { query } = req.body;
  const breakdown = explainQuery(query);
  res.json(breakdown);
});

app.post('/validate', (req, res) => {
  const { query } = req.body;
  const validationResult = validateQuery(query);
  res.json(validationResult);
});
app.all('*', (req, res) => {
    res.send("No such Page")
  });
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

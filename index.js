const express = require("express");
const connectDB = require("./database/db-connection");
const bookRoutes = require("./routes/bookRoutes.js");
const authorRoutes = require("./routes/authorRoutes.js");
const borrowerRoutes = require("./routes/borrowerRoutes.js");
const miscRoutes = require("./routes/miscRoutes.js");

const PORT = 3000;
const app = express();
app.use(express.json());

connectDB();
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/borrowers", borrowerRoutes);
app.use("/books", miscRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

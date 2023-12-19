const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public")); // 정적 파일 제공 경로 지정

app.get("/exchange-rates", async (req, res) => {
  try {
    const currencyUrl = req.query.url;
    const cssSelector = req.query.selector;

    const response = await axios.get(currencyUrl);
    const $ = cheerio.load(response.data);
    const result = $(cssSelector).text().trim();

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const parser = new Parser();

app.get('/latest', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://www.pcisecuritystandards.org/rss/');
    const latest = feed.items[0];
    
    res.json({
      title: latest.title,
      description: latest.contentSnippet || latest.summary,
      date: latest.pubDate,
      link: latest.link,
      status: "RSS LIVE ✅"
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(3001, () => console.log('✅ Backend LIVE http://localhost:3001'));

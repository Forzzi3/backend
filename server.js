const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Нет сообщения' });
  }

  fs.appendFile('data.txt', message + '\n', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Трабл в сохранении файла' });
    }
    res.json({ status: 'ok', saved: message });
  });
});

app.get('/api/read', (req, res) => {
  fs.readFile('data.txt', 'utf-8', (err, data) => {
    if (err) 
        return res.status(500).json({ error: 'Ошибка в чтении файла' });
    res.json({ content: data });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

const express = require('express')
const path = require('path')
const app = express()

// Middleware para redirecionar bolao10.net -> www.bolao10.net
app.use((req, res, next) => {
  if (req.headers.host === 'bolao10.net') {
    return res.redirect(301, 'https://www.bolao10.net' + req.url)
  }
  next()
})

// Middleware para servir os arquivos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')))

// Redireciona todas as rotas para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

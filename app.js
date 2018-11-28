const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

const mysql = require('mysql')
const con = mysql.createConnection(process.env.ION_DB_URL || process.env.JAWSDB_URL)

con.on('error', (err) => {
  console.log("[mysql error]",err);
});

con.query('CREATE TABLE IF NOT EXISTS `ion` (`shortUrl` text NOT NULL,`longUrl` longtext NOT NULL);', (error, results, fields) => {
  if (error) throw error
  console.log(`Created table if not exists 'ion'`)
})

const port = process.env.PORT || 3000
const apexDomainRedirect = process.env.APEX_DOMAIN || 'https://github.com/someshkar/ion'
const adminPassword = process.env.ADMIN_PASSWORD || 'ion'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

router.get('/', (req, res, next) => {
  res.redirect(302, apexDomainRedirect)
})

router.post('/api/deleteurl', (req, res, next) => {
  con.query('DELETE FROM ion WHERE shortUrl = ?', [req.body.shortUrl], (error, results, fields) => {
    console.log('Short URL deleted:', req.body.shortUrl)
  })
})

router.get('/shorten', (req, res, next) => {
  if (req.query.pass === adminPassword) {
    con.query('SELECT * FROM ion', (error, results, fields) => {
      res.status(200).render('shorten', {table: results})
    })
  } else if (req.query.pass !== adminPassword) {
    res.status(404).render('404', {url: req.url})
  } 
})

router.get('/:shortUrlId', (req, res) => {
  let longUrl = ''
  con.query('SELECT longUrl FROM ion WHERE shortUrl = ?', [req.params.shortUrlId], (error, results, fields) => {
    if (!results[0]) {
      console.log(`URL ${req.url} does not exist`)
      res.status(404).render('404', {url: req.url})
      res.end()
    } else if (results[0]) {
      longUrl = results[0].longUrl
      console.log(`URL ${req.url} redirected to ${longUrl}`)
      res.redirect(302, longUrl)
    }
  })
});

router.post('/api/shorten', (req, res, next) => {
  console.log(req.body)
  con.query('INSERT INTO ion VALUES (?, ?)', [req.body.shortUrl, req.body.longUrl], (error, results, fields) => {
    res.redirect(302, `/shorten?pass=${adminPassword}`)
  })
})

app.use('/', router)

app.set('views', './views')
app.set('view engine', 'pug')

app.listen(port, () => console.log(`Ion is running on port ${port}`))
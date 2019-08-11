
import express from 'express'
import https from 'https'
import path from 'path'
import fs from 'fs'

const app = express()
const port = 3333
const distDir = path.dirname(path.resolve(__dirname))
const secretDir = `${__dirname}/../../secret`
const htmlPath = `${distDir}/app/index.html`

app.use(express.static('dist/app'))

app.get('/*.html', (req: express.Request, res: express.Response) => {
    res.sendFile(htmlPath)
})

https.createServer({
    key: fs.readFileSync(`${secretDir}/server.key`),
    cert: fs.readFileSync(`${secretDir}/server.cert`)
}, app).listen(port, () => {
    console.log(`Server started on https://localhost:${port}`)
})

export default app

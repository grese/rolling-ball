
import express from 'express'
import https from 'https'
import path from 'path'
import fs from 'fs'

const env = process.env.NODE_ENV || 'development'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3333
const distDir = path.dirname(path.resolve(__dirname))
const secretDir = `${__dirname}/../../secret`
const htmlPath = `${distDir}/app/index.html`
const app = express()

app.use(express.static(`${distDir}/app`))

app.get('/*.html', (req: express.Request, res: express.Response) => {
    res.sendFile(htmlPath)
})

const httpsOptions = {
    key: fs.readFileSync(`${secretDir}/server.key`),
    cert: fs.readFileSync(`${secretDir}/server.cert`)
}
const server = https.createServer(httpsOptions, app)

function start() {
    server.listen(port, () => {
        console.log(`Server started on https://${host}:${port}`)
    })
}

if (env === 'development') {
    let reload
    try {
        reload = require('reload')
    } catch(error) {}

    // Start reloadable development server.
    reload(app, {https: {certAndKey: httpsOptions}})
        .then(start)
        .catch((err: Error) => {
            console.error('Unable to start reloadable dev server.', err)
        })
} else {
    // Start production server.
    start()
}

export default start

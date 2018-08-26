import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as dotenv from "dotenv"
import * as express from "express"
import * as mongoose from "mongoose"
import * as morgan from "morgan"
import router from "./router"

const app = express()
dotenv.config()

const db = {
  password: process.env.MONGO_PASSWORD,
  username: process.env.MONGO_USERNAME,
}
const DB_URI = `mongodb://${db.username}:${db.password}@localhost:27017/auth?authSource=admin`
mongoose.connect(DB_URI, { useNewUrlParser: true })

app.use(morgan("combined"))
app.use(cors())
app.use(bodyParser.json({ type: "*/*" }))
app.use("/", router)

const PORT = process.env.PORT || 3090
app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`)
})

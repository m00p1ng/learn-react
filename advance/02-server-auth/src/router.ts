import { Request, Response, Router } from "express"
import * as passport from "passport"
import * as Authentication from "./controllers/authentication"

// tslint:disable-next-line:no-var-requires
require("./services/passport")

const requireAuth = passport.authenticate("jwt", { session: false })
const requireSignin = passport.authenticate("local", { session: false })

const router = Router()

router.get("/", requireAuth, (_: Request, res: Response) => {
  res.send({ hi: "there" })
})

router.post("/signin", requireSignin, Authentication.signin)

router.post("/signup", Authentication.signup)
export default router

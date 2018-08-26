import { Document } from "mongoose"
import * as passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback } from "passport-jwt"
import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local"
import config from "../../config"
import User from "../models/user"

const localOptions: IStrategyOptions = { usernameField: "email" }
const localLogin = new LocalStrategy(localOptions, (email: string, password: string, done: any): void => {
  User.findOne({ email }, (err: any, user: any) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    user.comparePassword(password, (err1: any, isMatch: boolean) => {
      if (err1) { return done(err1) }
      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
})

const jwtOptinos: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
}

const jwtLogin = new JwtStrategy(jwtOptinos, (payload: any, done: VerifiedCallback): void => {
  User.findById(payload.sub, (err: any, user: Document) => {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)

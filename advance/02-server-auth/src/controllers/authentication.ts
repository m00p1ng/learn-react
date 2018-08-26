import { NextFunction, Request, Response } from "express"
import * as jwt from "jwt-simple"
import { Document } from "mongoose"
import config from "../../config"
import User from "../models/user"

const tokenForUser = (user: any): string => {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

export const signin = (req: Request, res: Response, next: NextFunction): void => {
  res.send({ token: tokenForUser(req.user) })
}

export const signup = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(422).send({ error: "You must provide email and password" })
    return
  }

  User.findOne({ email }, (err: any, existingUser: Document) => {
    if (err) { return next(err) }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in used" })
    }

    const user = new User({
      email,
      password,
    })

    user.save((err1: any) => {
      if (err1) { return next(err1) }

      res.json({ token: tokenForUser(user) })
    })
  })
}

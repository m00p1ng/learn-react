import * as bcrypt from "bcrypt-nodejs"
import * as mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    lowercase: true,
    type: String,
    unique: true,
  },
  password: String,
})

userSchema.pre("save", function(next: mongoose.HookNextFunction): void {
  const user: any = this

  bcrypt.genSalt(10, (err: any, salt: string) => {
    if (err) { return next(err) }

    bcrypt.hash(user.password, salt, null, (err1: any, hash: string) => {
      if (err1) { return next(err1) }

      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword: string, callback: any): void {
  bcrypt.compare(candidatePassword, this.password, (err: any, isMatch: boolean): void => {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

const ModelClass = mongoose.model("user", userSchema)

export default ModelClass

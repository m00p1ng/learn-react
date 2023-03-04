import jwt from "jsonwebtoken"

export const createActivationToken = (payload: Object) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};

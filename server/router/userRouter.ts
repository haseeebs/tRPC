import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
const SECRET = "ThisIsRandomSecret";

const userInputType = z.object({
  email: z.string(),
  password: z.string(),
});

export const userRouter = router({
  signup: publicProcedure.input(userInputType).mutation(async (options) => {
    // console.log(`This is from userRouter accessing User model from the database ${options.ctx.db.User}`);

    const email = options.input.email;
    const password = options.input.password;

    const response = await options.ctx.db.User.insertMany({
      email,
      password,
    });

    const userId = response[0]._id;

    const token: string = jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
    console.log(`This is the token from the signup function ${token}`);
    return { token };
  }),

  login: publicProcedure.input(userInputType).mutation((opts) => {
    const response = opts.ctx.db.User.findOne({
      email: opts.input.email,
    });
    console.log(`This is email from the input ${opts.input.email}`);
    if (!response) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const token: string = jwt.sign({ userId: opts.ctx.userId }, SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    return { token };
  }),
});

import { router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import jwt from "jsonwebtoken";
import { Todo, User } from "./db";
import { userRouter } from "./router/userRouter";
import { todoRouter } from "./router/todoRouter";
const SECRET = "RandomDummySecretForNow";

const appRouter = router({
  user: userRouter,
  todo: todoRouter
});

// Export type router type signature, NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    const authHeader = opts.req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(`This is token from headers ${token.length}`);

      return new Promise<{
        db: { Todo: typeof Todo; User: typeof User };
        userId?: string;
      }>((resolve, reject) => {
        jwt.verify(token, SECRET, (err, user) => {
          if (user) {
            console.log(`User is here's user detail ${user}`);
            resolve({ db: { Todo, User }, userId: (user as any).userId as string });
          } else {
            console.log(`User is not here`);
            resolve({ db: { Todo, User } });
          }
        });
      });
    }
    return {
      db: { Todo, User },
    };
  },
});

server.listen(3000, () => {
  console.log("Connected successfully on port 3000");
});
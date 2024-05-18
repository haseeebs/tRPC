import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const userInputType = z.object({
    email: z.string(),
    password: z.string()
})

const appRouter = router({
  createTodo: publicProcedure
    .input(todoInputType)
    .mutation((opts) => {

    const username = opts.ctx.username;
    if(!username){
      console.log('Username is not here...or it\'s undefined...');
    }
    console.log(username); // In the real world we check the username exist or not then performs in that manner
    console.log(`Ye createTodo ka options hai ye ${opts}`);
    const title = opts.input.title;
    const description = opts.input.description;

    // Do database stuff here...
    console.log(`Creating todo with title: ${title} and description: ${description}`);
    return { id: "1" };
  }),
  signup: publicProcedure
  .input(userInputType)
  .mutation((options) => {
    const email = options.input.email;
    const password = options.input.password;

    // Do validation here
    // Do database stuff here
    const token = 'lkjhasdflkjhasdflkjhasdflkjh' // It could be JWT token 

    return { token, message: 'This message is from signup procedure'}
  })
});

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        const authHeader = opts.req.headers["authorization"];
        console.log(authHeader); // logging that the header is reaching here
        // we have to do jwt.verify() make sure that authHeader is correct then only return username else undefined

        return {
            username: 'haseeb shaikh' // Returning a dummy username
        }
    }
})

server.listen(3000, () => {
    console.log('Connected successfully on port 3000');
  });
  
export type AppRouter = typeof appRouter;
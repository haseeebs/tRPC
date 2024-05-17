import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  createTodo: publicProcedure
    .input(todoInputType)
    .mutation((opts) => {
    const title = opts.input.title;
    const description = opts.input.description;

    // Do database stuff here...
    console.log(`Creating todo with title: ${title} and description: ${description}`);
    return { id: "1" };
  }),
});

const server = createHTTPServer({
    router: appRouter
})

server.listen(3000, () => {
    console.log('Connected successfully on port 3000');
  });
  
export type AppRouter = typeof appRouter;
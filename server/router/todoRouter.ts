import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

export const todoRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;

    const newTodo = new opts.ctx.db.Todo({
      title,
      description,
      done: false,
      userId: opts.ctx.userId,
    });

    const response = await newTodo.save();

    return { id: response.id };
  }),

  findTodo: publicProcedure
    .output(
      z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          done: z.boolean(),
        })
      )
    )
    .query(async (opts) => {
      const todos = await opts.ctx.db.Todo.find({
        userId: opts.ctx.userId,
      });

      return todos.map((todo) => ({
        title: todo.title || "",
        description: todo.description || "",
        done: todo.done || false,
      }));
    }),
});

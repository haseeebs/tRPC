import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers () {
          return {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ5OTI4NzQ0MjRkZTY4YmI0M2VkZmMiLCJpYXQiOjE3MTYwOTc2NzEsImV4cCI6MTcxNjEwMTI3MX0.dGJUfx5e4Y7skJ7AxOGHvx2AfDb1mgldmfZZPZgEGzY'
          }
      }
    }),
  ],
});

const main = async () => {
  const createTodo = await trpc.todo.createTodo.mutate({
    title: "Todo Title",
    description: "Todo Description",
  });

  console.log(`This is create todo from client index.ts ${createTodo}`);

  const signingUp = await trpc.user.signup.mutate({
    email: "userEmail@gmail.com",
    password: "RandomPassword",
  });

  const login = await trpc.user.login.mutate({
    email: "userEmail@gmail.com",
    password: "RandomPassword",
  });

  console.log(`This is from client login function ${login}`);
  
  console.log(`This is signup user from client index.ts ${signingUp}`);
};

main()
  .then(async () => {
    console.log("Working done");
  })
  .catch(async (error) => {
    console.error(`Got an error in client index.ts ${error}`);
  });

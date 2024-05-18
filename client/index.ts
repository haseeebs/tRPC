import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers () {
          return {
            Authorization: 'Bear asdflkjhasdflkjh'
          }
      }
    }),
  ],
});

const main = async () => {
  const createTodo = await trpc.createTodo.mutate({
    title: "Ye title hai na...",
    description: "yeto kuch bhi rakh do chalega...",
  });

  console.log(`This is create todo from client index.ts ${createTodo}`);

  const signedUpTheUser = await trpc.signup.mutate({
    email: "userEmail@gmail.com",
    password: "RandomPassword",
  });

  console.log(signedUpTheUser);
};

main()
  .then(async () => {
    console.log("Working done");
  })
  .catch(async (error) => {
    console.error(`Got an error in client index.ts ${error}`);
  });

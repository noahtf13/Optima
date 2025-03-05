---
marp: true
---

# NextJS Repo in a Day with a more Thoughtful AI Approach
---
## Background
### Problem
- Heard we were using NextJS at Onaroll
- Wanted to learn NextJS and had never written one line of frontend code
- Cursor/ChatGPT/Claude seemed like great options but...
  - More and more complex solutions until it is impossible to maintain
    - Frustrating try, copy error into AI, fix error, break something else, copy error into AI
  - People pleasing

---
## Background
### Solution
- Use [this approach](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm) from [Harper Reed]((https://harperreed.com/about/))
    - In short, use AI to:
        1. Create a `spec.md` file that describes the desired functionality
        2. Create a `prompt_plan.md` file that describes the plan to prompt the AI
        3. Create a `todo.md` file that describes the tasks to be completed
        4. Add all to repo you'll be working in, important for Cursor
    - Just as it is not a great idea to just get started and code, the same is true for AI
---
## Implementation
- [Repo](https://github.com/noahtf13/Optima)
- [Demo](https://optima-peach.vercel.app/)
![bg right 90%](images/meme.jpg)
--- 
## Learnings
- Have standards on cross-syntax quality
  - Especially when the context is one file, AI wants to solve the problem in the file and *just* solve your problem
    - Ex. Multiple times Cursor created a new button from scratch
- Don't shut off the non-artificial thing in your head, its a spectrum
  - Mashing errors into AI is not a good idea, review the diff each time, I lost time because of this
- Oddly made more excited about AI, while less sure that it will replace human in the loop
- Own the code, don't hand responsibility to AI but take the credit when it works
---
## Pros/Cons
- Pros
  - Greenfield repo in a day
  - Wouldn't have taken this on if I didn't have this approach
- Cons
  - Wish I had a base to go off, I didn't know if Cursor was deviating from best practice, [cursor rules](https://github.com/PatrickJS/awesome-cursorrules) could help
    - Want to take a crash course or build a _very_ basic NextJS app from scratch
---
# Sidebar
- [Made with Marp](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
- If you think you'll make money off a repo, don't put it on your work computer :)
---
# Questions?
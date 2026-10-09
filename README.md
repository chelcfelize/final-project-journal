# Proof: We Were Here

**Proof: We Were Here** is a personal digital diary that allows users to document their memories through journal entries and photos. It provides a private space for recording everyday experiences, revisiting past moments, and reflecting on memories over time. 

**Live site:** https://proofwewerehere.vercel.app/

**API:** https://proofwewerehereapi.onrender.com/healthz

**Demo video:** https://drive.google.com/file/d/1dxwLVZJvxvxJ891rc8h5s3A0vpjSVChE/view?usp=sharing

A screenshot of the main screen <img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/d358a1a6-eed9-445e-9596-fcbd67822574" />


## What it does/Features

**User Authentication** — Log in to access the diary.
**Personal Journal Entries** — Create and publish journal entries to document personal experiences.
**Photo Memories** — Add photos with titles and captions to preserve meaningful moments.
**Home Feed** — Browse previously published journal entries and photos in a scrolling feed.
**Edit and Delete Posts** — Update or remove existing journal entries and photo posts.
**Calendar View** — Navigate between months and years, identify dates with existing posts, and view memories associated with selected dates.
**AI Writing Assistant** — Generate writing prompts, creative exercises, and reflective questions to help overcome writer's block. The assistant provides guidance rather than writing the journal entry for the user.

## Built with

**React** — Builds the user interface.
**Vite** — Provides the frontend development and build tooling.
**CSS** — Styles the application's interface.
**Express.js** — Handles backend API requests.
**Google Gemini API** — Generates writing prompts, exercises, and reflective questions.
**Supabase** — Provides authentication and database services.
**Vercel** — Hosts the frontend application and backend API.

## Demo mode

This repository can run two ways, chosen by one environment variable at **build**
time.

**Demo mode is the default.** Only the exact string `false` turns it off, so a
forgotten or mistyped variable leaves you on the simulated backend with a visible
notice rather than on a silently broken build.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. This is what the template ships with, so the GitHub Pages link works on day one. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. |

**Demo mode is a starting point and a fallback, not a finished project.** Your
finals submission is all three pieces deployed and talking to each other. Demo
mode is there so you can build the interface in week one before the API exists,
and so you have something to show if a free tier is asleep during your demo.

GitHub Pages serves files and cannot run Node, so the API and the database can
never live there. They go somewhere else:

| Piece | Options |
| --- | --- |
| **API** | Render, Railway, Fly.io, Koyeb, a VPS, or [self-hosted behind a tunnel](../content/extending-your-app/11-self-hosting.md) |
| **Database** | Neon, Supabase, Railway, Aiven, or your own PostgreSQL |

`content/extending-your-app/` in your course workspace walks through all of it.
Page 10 is the decision page if you do not know which to pick.

## Running it yourself

**The client only, in demo mode.** No database needed.

    cd client
    npm install
    cp .env.example .env        # VITE_USE_MOCK_API stays true
    npm run dev                 # http://localhost:5173

**The whole stack.** Needs a PostgreSQL, either local or hosted.

    # 1. the database
    docker run --name my-pg -e POSTGRES_PASSWORD=devpassword \
      -e POSTGRES_DB=haunted -p 5432:5432 -d postgres:17

    # 2. the API
    cd server
    npm install
    cp .env.example .env        # check DATABASE_URL
    npm run db:reset            # creates the tables and adds sample rows
    npm run dev                 # http://localhost:3000

    # 3. the client, in another terminal
    cd client
    npm install
    cp .env.example .env
    # set VITE_USE_MOCK_API=false
    npm run dev

Check the API on its own before you blame the client:

    curl http://localhost:3000/healthz     # is the process alive
    curl http://localhost:3000/readyz      # is the database reachable
    curl http://localhost:3000/api/sightings

## Environment variables

None of these are committed. `.env.example` in each folder lists them with
placeholder values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password |
| `CORS_ORIGINS` | server | comma-separated origins allowed to call the API |
| `NODE_ENV` | server | `production` on your host |
| `PORT` | server | **set by the host**, do not set it yourself |
| `VITE_USE_MOCK_API` | client, at build time | only `false` turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | client, at build time | your API's public URL, no trailing slash |

Every `VITE_` value is compiled into the built JavaScript and is **public**.
Never put a key, a password or a connection string in one.

## Deploying

**Client, to GitHub Pages.** Already wired up in
`.github/workflows/deploy-pages.yml`. Two one-time steps:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.** Without
   this the workflow goes green and publishes nothing.
2. Nothing else, until your API is live. Demo mode is the default, so the first
   deploy works on its own. When the API is up, add `VITE_USE_MOCK_API` = `false`
   and `VITE_API_BASE_URL` under **Settings > Secrets and variables > Actions >
   Variables**, then re-run the workflow.

The repository must be **public** for Pages to serve it on a free account.

**API and database.** Not automated here, because most hosts deploy straight from
your repository with no workflow at all. Point your host at the `server/` folder,
set the environment variables in its dashboard, and run `server/db/schema.sql`
once against the hosted database.

## Project structure

    client/          React front end, built by Vite
      src/api/       ONE interface, two implementations, chosen by a variable
      src/components/
    server/          Express API
      db/            pool, schema.sql, seed.sql, and a runner for them
    compose.yml      only if you self-host
    docs/            your planning documents and weekly reports

## Architecture

Proof: We Were Here uses a frontend, backend API, and Supabase services to provide its functionality.

1. Frontend: The React application, built with Vite and deployed on Vercel, provides the login page, home feed, journal entry form, photo form, and calendar.
   
2. Authentication and database: Supabase handles user authentication and stores journal posts. Database access policies help restrict users to their authorized data.
   
3. Backend API: The Express.js server, deployed on Vercel, receives writing-assistant requests from the frontend and communicates with the Google Gemini API.
   
4. AI writing assistance: Gemini generates short writing prompts, exercises, and reflective questions, which are returned to the frontend for display.

 **Architecture Diagram**
                USER
                
                  |
                  
                  v
                  
       React + Vite Frontend
       
             (Vercel)
             
             /       \
             
            v         v
            
       Supabase     Express API
       
       Auth/DB      (Render)
       
                       |
                       
                       v
                       
                  Gemini API
                  
                       |
                       
                       v
                       
              Writing Suggestions
              
                       |
                       
                       v
                       
                React Frontend
                

## What I would do next

Three honest bullets. This paragraph is worth more than it looks.

## Author

Chelsea Felize Egaran

[Github Profile](https://github.com/chelcfelize)

CS-403

## AI use

![Built with AI assistance](https://img.shields.io/badge/built%20with-AI%20assistance-0b5fff)

- Assisted by ChatGPT

Link to the AI-USAGE.md: https://github.com/chelcfelize/final-project-journal/blob/main/AI-USAGE.md


## Licence

MIT, see [LICENSE](LICENSE).

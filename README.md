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


## Running it yourself

Before running the project, make sure you have:

Node.js

npm

A Supabase project

A Google Gemini API key


1. Clone the Repository
   
git clone https://github.com/chelcfelize/proof-we-were-here.git

cd proof-we-were-here

2. Set Up the Frontend
   

Navigate to the client directory and install the dependencies:


cd client

npm install


Configure the frontend environment variables using the names expected by your Supabase client and API configuration. Use your local environment file and keep actual credentials out of Git.

Start the development server:

npm run dev

Open the local URL displayed in your terminal.

3. Set Up the Backend

Open a separate terminal and navigate to the server directory:

cd server
npm install

Create a local .env file and configure the required backend environment variables, including GEMINI_API_KEY and the allowed frontend origin.

Start the backend using the development or start command defined in server/package.json.

The backend should be available at the local address configured by your server.

Note: Your frontend API URL must point to your local backend during local development. For the deployed application, it should point to the deployed Render API.

## Environment variables

| Name | Where | What it is |
| --- | --- | --- |
| `GEMINI_API_KEY` | backend | Authenticates requests to the Google Gemini API. |
| `FRONTEND_URL` | backend | Specifies the allowed frontend origin for CORS. |
| `PORT` | backend | `Specifies the port used by the server; the hosting platform may provide this automatically. |
| `Supabase project URL` | front end | Identifies the Supabase project. |
| `Supabase publishable/anon key` | front end | Allows the frontend to connect to Supabase under the project's configured access policies. |
| `Frontend API URL` | front end | Identifies the backend API used by the application. |

## Deploying

**Frontend**

The React frontend is deployed on Vercel.

1.Connect the GitHub repository to Vercel.

2.Set the Root Directory to client.

3.Configure the required frontend environment variables in Vercel's project settings, including your Supabase credentials and backend API URL.

4.Deploy the project. Vercel will build and host the frontend.

**Backend**

Deploy the Express.js backend using your configured hosting platform.

1. Configure the backend's root directory as server, if required by your hosting platform.

2. Add the required environment variables in the hosting platform's dashboard, including GEMINI_API_KEY and the allowed frontend origin.

3. Deploy the backend and verify that the API is running.

4. Ensure the frontend API URL points to the deployed backend.

**Database and Authentication**

Supabase manages the application's database and authentication. Configure the required database tables, authentication settings, and Row Level Security (RLS) policies in your Supabase project.

**Environment Variables**

Keep environment variables and secret keys out of the repository. Configure them locally for development and in the appropriate hosting dashboards for deployment.

## Project structure

  proof-we-were-here/ 
  client/       React frontend built with Vite 
  src/          Application source code and components 
  server/       Express.js backend and Gemini API integration 
  README.md     Project documentation

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

**Improve Calendar Organization**: Add more options for grouping and organizing journal entries and photo memories in the calendar.

**Support Multiple Users**: Implement user registration so multiple users can create accounts and maintain their own private personal diaries.

**Add an In-App Camera**: Allow users to take photos directly within the application and save them as diary memories.

**Enhance AI Writing Assistance**: Expand and refine the AI writing help feature by offering more writing prompts, personalized suggestions, and additional tools to help users reflect on and express their thoughts.

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

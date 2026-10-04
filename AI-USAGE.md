# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### Case 1 - 2026-09-24 - Loading First Page
- **Tool:**  
ChatGPT
- **What I asked for:** 
I asked for how do I make a loading symbol and delay for my first page (Intro) that would automatically be redirected to another page.
- **What it gave back:** 
It generated sample redirection of pages/functions using useNavigate and setTimeout.
- **What I kept, what I changed, and why:** 
I used the same functions it told me to use and set the amount of seconds I would like for it to load before proceeding to
initially the Home page. I also added a loading symbol so users know that it is loading and the app was just not frozen.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/646560565b6615e2637164c41ad195b78a1aa870

### Case 2 - 2026-09-24 - Start Database
- **Tool:**  
ChatGPT
- **What I asked for:** 
I asked ChatGPT to guide me for the step by step process on how to get started with Supabase and connect it to my project.
- **What it gave back:** 
It provided instructions for creating the Supabase project, connecting it to my app using the .env file, creating the database table for my posts, and setting up the Supabase client so the application could communicate with the databse. Initially, it suggested to only setup rules for select and insert and without checking whether user was authorized.
- **What I kept, what I changed, and why:** 
I followed the majority of the suggested setup and code for the connection of the database to my project, but I later changed and added parts of the database setup as I continue developing the application, including authentication, RLS, and additional fields needed for the journal entries and photos.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/41aee007304071ca3ac6098dced830803d359419

### Case 3 - 2026-09-25 - Home Page Formatting
- **Tool:**  
ChatGPT
- **What I asked for:** 
I asked for help on how to style the home page so thats posts appear as separate cards in the center.
- **What it gave back:** 
It gave back the styling of the cards containing the content from the database for each post. However, it is shown as individual little cards instead of the scrolling type that I want it to be.
- **What I kept, what I changed, and why:** 
I kept the centered layout and the use of cards but I changed the way the posts were displayed into the continuous scrolling type to give the home page the social media feed feel as with the original plan.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/9087d2073093b21f65842bb6aa3b7079a067da60

### Case 4 - 2026-09-25 - Calendar Grid Formatting
- **Tool:**  
ChatGPT
- **What I asked for:** 
I asked for the calendar grid that would enable the users to see which dates have posts as well as be able to navigate through the calendar by going back and forth through the months/years.
- **What it gave back:** 
It gave me a code for that calendar grid and to be able to go back and forth through the months/years using the FullCalendar module. However, on my end it was not working as I expected as it displays the components in a vertical or compact manner.
- **What I kept, what I changed, and why:** 
I decided to not use the FullCalendar anymore and just opted to create a custom calendar grid and fix its styling with CSS, as this worked as intended than with the solution the AI used first hand.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/9087d2073093b21f65842bb6aa3b7079a067da60

### Case 5 - 2026-09-27 - Intro-to-Login Redirect
- **Tool:**  
ChatGPT
- **What I asked for:** 
I asked for an initial, bare login page code that connects with Supabase as well as new routing for it to put in the App component
- **What it gave back:** 
It gave back the login page that I was expecting however the routing completely disregarded my Intro; it went as login as the first or landing page that gets redirected to the home page.
- **What I kept, what I changed, and why:** 
I kept the working login page but fixed the routing. Intro page first before proceeding to the Login then Home page.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/3832331714df9ac6bc4fe405134183147ea2a12d

### Case 6 - 2026-10-01 - AI writing help
- **Tool:**  
ChatGPT and Gemini API
- **What I asked for:** 
I asked for help in adding the AI writing help feature to the AddEntry page. The AI should be able to give prompts, exercises, and/or questions to help the user for starting an entry if they needed so. I also wanted to limit it to only that, and for the AI to not be able to generate texts that could be a replacement for the user in writing their own entry.
- **What it gave back:** 
It helped me create a separate Express server that sends requests to the API then return a writing suggestion to the app. 
- **What I kept, what I changed, and why:** 
The idea of using an AI help for journal entry writing is kept as the original plan, and most of what ChatGPT's code with this particular segment. However, I changed the implementation to use a separate Express server between React and Gemini API. I also changed the Gemini model when the initial model given by ChatGPT was always unavailable and as I have encountered multiple errors during testing.
- **Commit:** 
https://github.com/chelcfelize/final-project-journal/commit/099995a4eba1cc576d632ba60d19ae151dc1a8e3


## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Login Page Creation with Routing Edit

- **What it gave me:**
It gave me the initial, bare login page code that connects with Supabase as well as new routing for it to put in the App component
- **What was wrong with it:**
The routing it made disregarded my Intro component and headed straight to the home page.
- **What I did instead:**
I edited the routing it has written which excluded the Intro component that is supposed to be the page the user lands upon at first 
opening the app. Added the intro component in the App() and edited the page it gets redirected to; from intro-to-home to intro-to-login
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/3832331714df9ac6bc4fe405134183147ea2a12d

### Case 2 - Calendar Formatting
- **What it gave me:**
It gave me a code for my calendar grid page that is able to go back and forth between month-years, and it utilized the FullCalendar module for this part.
- **What was wrong with it:**
The way it was displaying was everything was packed and were appearing vertically even with tinkering and trying to fix the CSS.
- **What I did instead:**
What I did instead is that I opted to just create a custom calendar grid and edited its CSS. With this, it worked as how I liked and intended it to be.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/9087d2073093b21f65842bb6aa3b7079a067da60

### Case 3 - AI writing help
- **What it gave me:**
It gave me code for implementing the AI writing help feature and initially used a Gemini model for generating writing prompts, exercises, and reflection questions.
- **What was wrong with it:**
The initial Gemini model it suggested was unavailable when I tried to use it. And during testing, I encountered service availability errors which prevented the AI writing help from consistently working.
- **What I did instead:**
I changed the Gemini model being used and continued testing the feature with the new model. I also used a separate Express server to handle the requests between my React app and the Gemini API. I adjusted the implementation based on the errors that appeared so that the AI feature would remain limited to providing writing prompts, exercises, and questions rather than generating the user's entire journal entry.
- **Commit:** https://github.com/chelcfelize/final-project-journal/commit/099995a4eba1cc576d632ba60d19ae151dc1a8e3

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

- **File:** 
Loading Landing Page, Navbar, AddEntry, AddPhoto
- **Commit:** 
https://github.com/chelcfelize/final-project-journal/commit/646560565b6615e2637164c41ad195b78a1aa870

https://github.com/chelcfelize/final-project-journal/commit/76cea2e7c57fa95a6541f6c51bfe7f74fb14a17d

https://github.com/chelcfelize/final-project-journal/commit/9087d2073093b21f65842bb6aa3b7079a067da60
- **What it does and why it is built this way:**
  
The Loading Landing Page (Intro) serves as the first page of the app and displays the app's title and a loading symbol before redirecting the user to the login page.

The Navbar is present in all pages as it serves as the way for the user to go back and forth through pages, and the add button is made in the manner that 
it opens a pop-up box of choices of whether to add an entry or a photo. 

The AddEntry and AddPhoto forms so that users can input their own journal entries, titles, captions, and photos to publish to the app.

### The AI-written part I understand best

- **File:**
Home
- **Commit:**
https://github.com/chelcfelize/final-project-journal/commit/9087d2073093b21f65842bb6aa3b7079a067da60
- **What it does and why we kept it:**
The Home page retrieves the journal posts from the Supabase database and displays them as the main page (Home) of the application. The useEffect function is used to retrieve the posts when the page loads and .map() is used to display each post. The functions edit and delete are also present in each card post where the edit feature allows users to change the title and content of a post, while deleting removes the selected post from the database. The Home page also filters posts by date when a specific date is selected from the calendar page. This part is kept because this is the main place of the app.

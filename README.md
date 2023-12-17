# Semesterproject 2 - AUCTION

### Links
* Deployed site: https://semproauch-julia.netlify.app/
* KANBAN and ghant chart in Figma: https://www.figma.com/file/70XaOVGAIYfoWUJXtbhXP8/Untitled?type=whiteboard&node-id=0%3A1&t=Mw1RftLv80CTVeot-1
* Figma design: https://www.figma.com/file/ovhkuVDFHdnE91D7IivvnR/Semesterproject-2-AUCTION?type=design&node-id=0%3A1&mode=design&t=SlwDy9DlQoy0v4a6-1


This project is for my school semester project assignment. The task was to create a fully functional auction site where users can search through listings, create new listings and bid on other users’ listings. A user should also be able to register, log in, change their avatar photo and see all biddings on specific listings. This also happens to be my very first big project using React.

### Design choices:
I started this project by looking at other similar project by other students, and also did research on actual auction/resale sites, such as auksjonen.no and finn.no. I tried to keep it simple and focus on the functionality. 

### Colors:
The color scheme is very simple -  white, dark gray, black and turquoise. Also added some green and red for UX. I didn’t want to include too many colors. I chose the turquoise color as the brand color because I haven’t seen it very many places, and it pops without screaming.

### Typography:
I only use one font, but vary with different boldness and colors. 

## Technical report:
### Language and frameworks:
This is a Vite project in React, including HTML, CSS and javascript. I used Tailwind CSS for styling and some Tailwind components. I also used the TanStack router for navigation.


### File structure: 
This project is structured by components and pages. Every component has its own folder, inside of a folder that holds all the components. Each page imports their associated component(s). Components that associate to all pages, in this case the navigation bar, are imported directly to the App.jsx file. I also added a separate js file for fetching API. It’s not a perfect structure, but not too messy either. 


### API endpoints:
I used the network tab alot for this project to keep track of responses/requests. 

# Gather4Grub Frontend
This project provides a simple tool for planning a potluck dinner party. Users can create events, invite their friends, and collaborate on the menu. Gather4Grub helps to make sure all you don't end up with three mac and cheese and no veggies.

## Requirements
The frontend of this project was built with React and Material UI's component library.


## App Walk Through
### Landing Page
From the landing page you can sign-up or login.
### Sign Up Page
Enter basic information and create a user account. Upon signup you are immediately logged in.
### Login Page
Straight foward login page. Once login has processed you are directed to the user dashboard page.
### User Dashboard
This is the main user view, with the following areas:<br>
- Upcoming Events: list of upcoming events, each links to the event page. If more than three events, see all link appears and will display all events in a modal.
- Connect: buttons to open modals to view other users you are connected with, find other users, and view any pending requests from other users.
- Invitations: all pending event invitations will display here.

### Event Dashboard
The event dashboard has all event information. The view is slightly different for the host of the event as they have more access to edit details, invite/remove guests, add courses to the menu, and moderate comments.
- Main Details - Title, host, data, time, location and a description of the event are displayed at the top of the page. Host view - edit button which opens an edit Dialog allowing the host to edit all details. The guest view includes a button group to update the current user's RSVP.
- Guests - this is the guest list, display guests information including their current RSVP.
- Menu - Menu is displayed in accordions for each course. Courses are set by the host and can be added by the host. Guests are abel to add menu items. Both of these buttons open dialogs that allow for interaction.
- Comments - guests can leave comments. All users can delete their own comments, hosts can delete any comment from the event.

### Create Event Page
Here you can create a new event. Date and Title are the only required fields.

### Edit User
Update user's information. User can pick from a preset list of avatars.
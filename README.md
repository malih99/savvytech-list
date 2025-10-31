# SavvyTech Item Manager

A React-based item management app built with Zustand for state management and Radix UI for modals/dialogs. It allows users to create, edit, delete, and view items, with mock items for testing purposes.

---

## Features

- **CRUD Items:** Create, read, update, and delete items.
- **Mock Items:** Automatically generates sample items if the list is empty.
- **Local State Persistence:** Uses Zustand with `persist` middleware to save items in local storage.
- **Search & Sort:** Filter items by query and sort by newest/oldest.
- **Image Upload & Preview:** Upload an image for each item and preview before saving.
- **Details Modal:** View full item details and perform actions from the details view.
- **Unique IDs:** All items have unique IDs (UUID) to prevent duplicates.
- **Responsive Grid Layout:** Items are displayed in a responsive grid.
- **Notifications:** Uses `react-hot-toast` for success/error messages.

---

## Tech Stack

- **React 18** – Frontend library
- **TypeScript** – Type safety
- **Zustand** – State management
- **Radix UI** – Accessible modals/dialogs
- **Framer Motion** – Animations for modals and overlays
- **Zod + react-hook-form** – Form validation
- **Tailwind CSS** – Styling
- **react-hot-toast** – Notifications

---

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/malih99/savvytech-list>
cd <your-repo-folder>
Install dependencies:

bash
Copy code
npm install
# or
yarn
Start the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open http://localhost:5173 in your browser.

Usage
Creating an Item
Click the Create button on the toolbar.

Fill in the form fields (title, subtitle, category) and optionally upload an image.

Click Create to save the item.

Editing an Item
Click Edit on an item card or in the details modal.

Update the fields and save.

Deleting an Item
Click Delete on an item card or in the details modal.

Confirm deletion in the popup.

Searching & Sorting
Use the search input to filter items by title or subtitle.

Change the sort order using the sort control (newest/oldest).

Mock Items
If the item list is empty, sample items are generated automatically.

Mock items are removed when a real item is added.

Code Highlights
State Store (useItemsStore)
Handles CRUD operations and category management.

Uses Zustand with persist middleware to save data in local storage.

Prevents duplicate IDs by checking existing items before creating.

Unique IDs
All items now use UUIDs for IDs, including mock items, to prevent duplicates.

Forms
Built with react-hook-form and validated with Zod.

Supports image upload with live preview.

Reset automatically when creating a new item or closing the modal.

UI
Responsive grid layout using Tailwind CSS.

Modal animations with Framer Motion.

Success and error notifications using react-hot-toast.

Contributing
Fork the repository.

Create a new branch:

bash
Copy code
git checkout -b feature/my-feature
Make your changes and commit:

bash
Copy code
git commit -am "Add new feature"
Push to your branch:

bash
Copy code
git push origin feature/my-feature
Open a pull request.

Known Issues / Todo
Ensure rapid consecutive saves do not trigger duplicate IDs (handled with UUID now).

Future: add persistent backend storage (API) instead of local storage.

Future: add category filtering and sorting.


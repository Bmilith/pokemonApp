## Application description

This application fetches and displays a comprehensive list of Pokémon along with their detailed information. Users can browse through all available Pokémon, viewing key details such as name, image, types, and stats.

Features include:

- Fetching data from the Pokémon API.
- Displaying Pokémon in a paginated list or grid.
- Viewing detailed information for each Pokémon.
- Handling loading and error states effectively.

## Possible Improvements

Currently, to compare Pokémon:
Click on a Pokémon’s modal card and press Compare to select it. Then open the modal of a second Pokémon to compare with.

Suggestions to improve this flow:

- After pressing Compare on the first Pokémon, show a clear message like: “You’ve selected [Pokémon Name] for comparison. Please choose another Pokémon.”
- Automatically open or guide the user to select the second Pokémon modal for comparison.

- Add global styles using Tailwind CSS to ensure consistent styling across the app and reduce custom CSS.
- Add more detailed comments throughout the codebase to improve readability and maintainability.
- Add comprehensive test coverage to include every component and core function, ensuring robustness.
- Extend i18n implementation to cover all components and user-facing strings for full multilingual support.

### Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

### Features

- products view, filtering, sorting, searching, pagination, preserving state, favorites, building team, routing
- used: React, TypeScript, Vite, i18n, jest

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bmilith/pokemonApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd yourproject
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Usage

1. Run the app:
   ```bash
   npm run dev
   ```
2. Run tests
   ```bash
   npm test
   ```

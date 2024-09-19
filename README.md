# Pokémon Explorer

This project is a **Pokémon Explorer** built with [Next.js](https://nextjs.org), styled with a Pokémon theme, and powered by the [PokéAPI](https://pokeapi.co). The app allows users to search for their favorite Pokémon, explore detailed information, and dynamically load more Pokémon with ease.

![Screenshot of the Pokémon Explorer](https://raw.githubusercontent.com/ararrojas/pokemon-explorer/refs/heads/main/public/newscreen.png)

## Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, you can open [http://localhost:3000] in your browser to explore the app. It supports live reloading, so any changes you make will be reflected instantly.

# Pokémon App Features

## Home Page
- **Functionality**: Allows users to browse a list of Pokémon fetched from the PokéAPI.
- **Display**: Shows the first 20 Pokémon names in a vertical list.
- **Pagination**: Fetches 20 Pokémon at a time with a "Load More" button to fetch additional Pokémon.
- **Search Bar**: Enables users to search for a Pokémon by name, linking to the detailed page of the selected Pokémon.

**API Used**: PokéAPI - Pokémon List

## Pokémon Details Page
- **Navigation**: Clicking on a Pokémon from the home page navigates to a dynamically generated details page.
- **Information Provided**:
- **Images**: Official artwork of the Pokémon, including regular and shiny forms.
- **Basic Details**: Name, ID, abilities, weight and height.
- **Stats**: Displays a list of stats like HP, Attack, Defense, etc.

## Deployment
- **Platform**: Vercel for optimal performance and scalability.
- **Commands**:
  ```bash
  npm run build
  npm run start
  ```

## Future Improvements (Optional)
- **Advanced Search**: Implement filters for searching Pokémon by types, abilities, or regions.
- **Favorites List**: Allow users to bookmark favorite Pokémon for quick access.
- **Real-time Updates**: Automatically load new Pokémon as they are added to the PokéAPI database.

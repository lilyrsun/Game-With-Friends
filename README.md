# 🎮 Game With Friends

**Game With Friends** is a retro-inspired multiplayer game discovery website built with React, JavaScript, HTML, and CSS. The site helps users explore games they can play with friends by browsing real video game data from the RAWG Video Games Database API.

The project was created as a final project for CSE 2004: Web Development and focuses on polished visual design, interactive browsing, external API integration, and responsive frontend implementation.

## 🔴 Live Site

[View the deployed site on GitHub Pages](https://washu-cse2004-sp2026-1.github.io/final-project-lilyrsun/)

## ℹ️ Project Overview

Game With Friends is designed as a curated arcade-style archive for discovering multiplayer games. Instead of presenting games as a plain database, the site uses a visual browsing experience with a neon retro aesthetic, animated carousel, category-based tabs, modal previews, and interactive filters.

Users can explore games by:

- Genre, Platform, Release date, Rating

The homepage highlights popular and highly rated games, while the category pages allow users to narrow the game archive using real data from the RAWG API.

## 🎨 Design Direction

### Original Figma Design
https://www.figma.com/proto/YrTCKiG0cWzIaVjTuibHtV/Lily-Sun---Archive-Website?node-id=208-132&starting-point-node-id=208%3A132&t=eUgyxNoM9MsL5sZJ-1 

The visual design is inspired by retro arcade interfaces, Pac-Man-style imagery, neon game rooms, and glitch typography. The goal was to create a game discovery page that feels more immersive and memorable than a standard API grid.

## ✨ API Used

This project uses the [RAWG Video Games Database API](https://rawg.io/apidocs).

The app requests multiplayer games using the RAWG games endpoint and pulls fields such as:

- Game title, Game ID and slug, Background image, Genres, Platforms, Release date, RAWG rating, RAWG popularity/activity count, Tags, RAWG game page URL

The app then formats this data into a simplified structure for display across the homepage, category pages, cards, carousel, and modals.

## 🤖 Technologies Used

- React, Vite, JavaScript, HTML, CSS, RAWG API

## 💡 Features

- **RAWG API Integration**: Fetches multiplayer game data from the RAWG Video Games Database API.

- **Tabbed Navigation**: Users can switch between Home, Genre, Platform, Release Date, and Ratings pages without leaving the single-page React app.

- **Most Popular Games Carousel**: Displays popular games in a horizontally scrollable carousel that also auto-scrolls.

- **Top Rated Picks**: Highlights highly rated multiplayer games based on RAWG rating data.

- **Explore All Section**: Shows a grid of games with a “Show More” button to reveal additional results.

- **Category Filters**: Allows users to filter games by real RAWG metadata such as genre, platform, release era, and rating group.

- **Game Detail Modal**: Clicking a game opens a modal with more information, including genre, rating, platform, release date, and a link to the game’s RAWG page.

- **Responsive Design**: Layout adjusts for desktop, tablet, and mobile screens.

- **Retro Arcade Visual Style**: Uses neon colors, glitch-inspired typography, hover states, pixel/arcade motifs, and a dark visual system.

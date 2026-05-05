import { useState } from "react";
import "./App.css";

const games = [
  {
    id: 1,
    title: "Overcooked! 2",
    genre: "Co-op",
    players: "1-4 players",
    price: "Paid",
    duration: "15-30 min",
    style: "Chaotic teamwork",
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80",
    description:
      "A fast-paced cooperative cooking game where players work together under pressure to prepare, cook, and serve dishes."
  },
  {
    id: 2,
    title: "Among Us",
    genre: "Social Deduction",
    players: "4-15 players",
    price: "Free/Paid",
    duration: "10-20 min",
    style: "Suspicion and strategy",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    description:
      "A multiplayer social deduction game where crewmates complete tasks while impostors try to sabotage the mission."
  },
  {
    id: 3,
    title: "Rocket League",
    genre: "Sports",
    players: "1-8 players",
    price: "Free",
    duration: "5-10 min",
    style: "Competitive action",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    description:
      "A high-energy multiplayer game that combines soccer-style competition with rocket-powered cars."
  },
  {
    id: 4,
    title: "Stardew Valley",
    genre: "Co-op",
    players: "1-8 players",
    price: "Paid",
    duration: "Open-ended",
    style: "Relaxed collaboration",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description:
      "A cozy farming and life simulation game where friends can build farms, explore mines, fish, and decorate together."
  }
];

function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedGame, setSelectedGame] = useState(null);

  const genres = ["All", ...new Set(games.map((game) => game.genre))];

  const filteredGames =
    selectedGenre === "All"
      ? games
      : games.filter((game) => game.genre === selectedGenre);

  return (
    <main className="site">
      <nav className="nav">
        <a className="logo" href="/">
          PartyQueue
        </a>
        <div className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">Multiplayer Game Discovery</p>
        <h1>Find the perfect game for your next group hangout.</h1>
        <p className="hero-copy">
          Browse online multiplayer games by vibe, player count, price, and
          gameplay style — all in one curated discovery page.
        </p>

        <div className="hero-actions">
          <a href="#discover" className="primary-button">
            Start browsing
          </a>
          <span className="api-note">Powered by RAWG API soon</span>
        </div>
      </section>

      <section className="section-header" id="discover">
        <div>
          <p className="eyebrow">Browse Games</p>
          <h2>Choose a game night mood</h2>
        </div>
        <p>
          Filter by category and click a card for a quick preview. This will
          later connect to live game data from RAWG.
        </p>
      </section>

      <section className="filters" aria-label="Game filters">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? "filter active" : "filter"}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </section>

      <section className="game-grid" aria-label="Game results">
        {filteredGames.map((game) => (
          <article
            className="game-card"
            key={game.id}
            onClick={() => setSelectedGame(game)}
          >
            <div className="image-wrap">
              <img src={game.image} alt={game.title} />
              <span>{game.price}</span>
            </div>

            <div className="game-content">
              <p className="tag">{game.genre}</p>
              <h3>{game.title}</h3>
              <p>{game.description}</p>

              <div className="metadata">
                <span>{game.players}</span>
                <span>{game.duration}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="about" id="about">
        <p className="eyebrow">Project Goal</p>
        <h2>A polished discovery webpage, not just a database.</h2>
        <p>
          This project focuses on visual design, responsive layout, interactive
          browsing, and external API integration to create a portfolio-ready web
          experience.
        </p>
      </section>

      {selectedGame && (
        <div className="modal-backdrop" onClick={() => setSelectedGame(null)}>
          <section
            className="modal"
            aria-label={`${selectedGame.title} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="close" onClick={() => setSelectedGame(null)}>
              ×
            </button>
            <img src={selectedGame.image} alt={selectedGame.title} />
            <p className="tag">{selectedGame.genre}</p>
            <h2>{selectedGame.title}</h2>
            <p>{selectedGame.description}</p>

            <div className="modal-details">
              <span>{selectedGame.players}</span>
              <span>{selectedGame.price}</span>
              <span>{selectedGame.duration}</span>
              <span>{selectedGame.style}</span>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import pacmenLogo from "./assets/logo-pacmen.png";
import ghostsLogo from "./assets/logo-ghosts.png";

function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedPlayers, setSelectedPlayers] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [logoClicked, setLogoClicked] = useState(false);

  useEffect(() => {
    async function getGames() {
      try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&tags=multiplayer&page_size=40&ordering=-rating`;

        const response = await fetch(url);
        const data = await response.json();

        const cleanedGames = data.results.map((game, index) => {
          const rating = game.rating || 0;

          let priceLabel = "Check Store";
          if (index % 3 === 0) priceLabel = "Free";
          if (index % 5 === 0) priceLabel = "Paid";

          let playerGroup = "Small Group";
          if (index % 4 === 0) playerGroup = "Large Group";
          if (index % 5 === 0) playerGroup = "Solo Friendly";

          return {
            id: game.id,
            slug: game.slug,
            gameUrl: `https://rawg.io/games/${game.slug}`,
            title: game.name,
            genre: game.genres?.[0]?.name || "Multiplayer",
            players: playerGroup,
            price: priceLabel,
            duration: "Varies",
            style:
              game.tags?.slice(0, 2).map((tag) => tag.name).join(", ") ||
              "Online Play",
            image: game.background_image,
            rating,
            ratingGroup:
              rating >= 4.5
                ? "5-Star"
                : rating >= 4
                ? "4-Star"
                : rating >= 3
                ? "3-Star"
                : "Under 3-Star",
            popularity: game.added || 0,
            description: `A ${
              game.genres?.[0]?.name || "multiplayer"
            } game with a RAWG rating of ${rating || "N/A"}.`
          };
        });

        setGames(cleanedGames);
      } catch (error) {
        console.error("Error fetching RAWG games:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getGames();
  }, []);

  const tabs = [
    { id: "home", label: "Home" },
    { id: "genre", label: "Genre" },
    { id: "price", label: "Price" },
    { id: "players", label: "Players" },
    { id: "ratings", label: "Ratings" }
  ];

  const genres = ["All", ...new Set(games.map((game) => game.genre))];
  const priceOptions = ["All", "Free", "Paid", "Check Store"];
  const playerOptions = ["All", "Solo Friendly", "Small Group", "Large Group"];
  const ratingOptions = ["All", "5-Star", "4-Star", "3-Star", "Under 3-Star"];

  const topRatedGames = useMemo(
    () => [...games].sort((a, b) => b.rating - a.rating).slice(0, 8),
    [games]
  );

  const popularGames = useMemo(
    () => [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 8),
    [games]
  );

  const carouselGames = topRatedGames.slice(0, 10);
  const visibleExploreGames = games.slice(0, visibleCount);

  const genreGames =
    selectedGenre === "All"
      ? games
      : games.filter((game) => game.genre === selectedGenre);

  const priceGames =
    selectedPrice === "All"
      ? games
      : games.filter((game) => game.price === selectedPrice);

  const playerGames =
    selectedPlayers === "All"
      ? games
      : games.filter((game) => game.players === selectedPlayers);

  const ratingGames =
    selectedRating === "All"
      ? games
      : games.filter((game) => game.ratingGroup === selectedRating);

  function resetShowMore() {
    setVisibleCount(12);
  }

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    resetShowMore();
  }

  return (
    <main className="page-shell">
      <section className="arcade-screen">
        <nav className="top-bar">
          <button
            className="logo-toggle"
            onClick={() => handleTabChange("home")}
            aria-label="Go to home page"
            type="button"
          >
            <img
              src={pacmenLogo}
              alt="Game With Friends home"
              className="logo-image pacmen-logo"
            />
            <img
              src={ghostsLogo}
              alt=""
              aria-hidden="true"
              className="logo-image ghosts-logo"
            />
          </button>

          <div className="tab-nav" aria-label="Main navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? "tab active" : "tab"}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <header className="hero compact-hero">
          <p className="eyebrow">Multiplayer Archive</p>
          <h1>Game With Friends</h1>
          <p className="hero-copy">
            Find online multiplayer games by genre, price, player count, and
            rating — so your group can spend less time deciding and more time
            playing.
          </p>
        </header>

        {isLoading && <p className="loading">Loading multiplayer games...</p>}

        {!isLoading && games.length === 0 && (
          <p className="loading">No games found. Check your API key.</p>
        )}

        {!isLoading && activeTab === "home" && (
          <HomePage
            carouselGames={carouselGames}
            topRatedGames={topRatedGames}
            popularGames={popularGames}
            visibleExploreGames={visibleExploreGames}
            visibleCount={visibleCount}
            totalGames={games.length}
            setVisibleCount={setVisibleCount}
            setSelectedGame={setSelectedGame}
          />
        )}

        {!isLoading && activeTab === "genre" && (
          <CategoryPage
            eyebrow="Explore By"
            title="Genre"
            description="Choose a genre to narrow the multiplayer archive."
            options={genres}
            selectedOption={selectedGenre}
            setSelectedOption={setSelectedGenre}
            games={genreGames}
            setSelectedGame={setSelectedGame}
          />
        )}

        {!isLoading && activeTab === "price" && (
          <CategoryPage
            eyebrow="Explore By"
            title="Price"
            description="Sort games by whether they are free, paid, or listed through a store."
            options={priceOptions}
            selectedOption={selectedPrice}
            setSelectedOption={setSelectedPrice}
            games={priceGames}
            setSelectedGame={setSelectedGame}
          />
        )}

        {!isLoading && activeTab === "players" && (
          <CategoryPage
            eyebrow="Explore By"
            title="Players"
            description="Find games for solo browsing, small friend groups, or larger parties."
            options={playerOptions}
            selectedOption={selectedPlayers}
            setSelectedOption={setSelectedPlayers}
            games={playerGames}
            setSelectedGame={setSelectedGame}
          />
        )}

        {!isLoading && activeTab === "ratings" && (
          <CategoryPage
            eyebrow="Explore By"
            title="Ratings"
            description="Browse games by rating group based on RAWG rating data."
            options={ratingOptions}
            selectedOption={selectedRating}
            setSelectedOption={setSelectedRating}
            games={ratingGames}
            setSelectedGame={setSelectedGame}
          />
        )}

        {!isLoading && activeTab === "ratings" && (
          <CategoryPage
            eyebrow="Explore By"
            title="Ratings"
            description="Browse games by rating group based on RAWG rating data."
            options={ratingOptions}
            selectedOption={selectedRating}
            setSelectedOption={setSelectedRating}
            games={ratingGames}
            setSelectedGame={setSelectedGame}
          />
        )}

        <footer className="site-footer">
          <div>
            <p className="eyebrow">Game With Friends</p>
            <h2>Ready for the next round?</h2>
            <p>
              Lily Sun | CSE 2004A Final Project | Data from RAWG Video Games Database
            </p>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => handleTabChange("home")}>
              Home
            </button>
            <button type="button" onClick={() => handleTabChange("genre")}>
              Genre
            </button>
            <button type="button" onClick={() => handleTabChange("price")}>
              Price
            </button>
            <button type="button" onClick={() => handleTabChange("players")}>
              Players
            </button>
            <button type="button" onClick={() => handleTabChange("ratings")}>
              Ratings
            </button>
          </div>
        </footer>
      </section>

      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </main>
  );
}

function HomePage({
  carouselGames,
  topRatedGames,
  popularGames,
  visibleExploreGames,
  visibleCount,
  totalGames,
  setVisibleCount,
  setSelectedGame
}) {
  return (
    <>
      <section className="home-section">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Featured Games</h2>
          </div>
          <p>Moving carousel</p>
        </div>

        <div className="carousel-shell">
          <div className="carousel-track">
            {[...carouselGames, ...carouselGames].map((game, index) => (
              <article
                className="carousel-card"
                key={`${game.id}-${index}`}
                onClick={() => setSelectedGame(game)}
              >
                <img src={game.image} alt={game.title} />
                <div>
                  <p className="tag">{game.genre}</p>
                  <h3>{game.title}</h3>
                  <span>★ {game.rating || "N/A"}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Top Rated</p>
            <h2>This Month&apos;s Top Rated</h2>
          </div>
          <p>Powered by RAWG API</p>
        </div>

        <div className="spotlight-grid">
          {topRatedGames.slice(0, 3).map((game, index) => (
            <article
              className={index === 0 ? "spotlight-card large" : "spotlight-card"}
              key={game.id}
              onClick={() => setSelectedGame(game)}
            >
              <img src={game.image} alt={game.title} />
              <div className="featured-overlay">
                <p className="tag">{game.genre}</p>
                <h3>{game.title}</h3>
                <span>★ {game.rating || "N/A"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Popular</p>
            <h2>Most Popular Games</h2>
          </div>
          <p>Based on RAWG activity</p>
        </div>

        <div className="horizontal-scroll">
          {popularGames.map((game) => (
            <GameCard key={game.id} game={game} onClick={setSelectedGame} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Archive</p>
            <h2>Explore All</h2>
          </div>
          <p>
            Showing <strong>{Math.min(visibleCount, totalGames)}</strong> of{" "}
            <strong>{totalGames}</strong>
          </p>
        </div>

        <div className="game-grid">
          {visibleExploreGames.map((game) => (
            <GameCard key={game.id} game={game} onClick={setSelectedGame} />
          ))}
        </div>

        {visibleCount < totalGames && (
          <div className="show-more-wrap">
            <button
              className="show-more-button"
              onClick={() => setVisibleCount((count) => count + 8)}
            >
              Show More
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function CategoryPage({
  eyebrow,
  title,
  description,
  options,
  selectedOption,
  setSelectedOption,
  games,
  setSelectedGame
}) {
  return (
    <section className="category-layout">
      <aside className="filter-panel">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="filter-help">{description}</p>

        <div className="filters">
          {options.slice(0, 10).map((option) => (
            <button
              key={option}
              className={selectedOption === option ? "filter active" : "filter"}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </aside>

      <section className="results-section">
        <div className="results-heading">
          <div>
            <p className="eyebrow">Results</p>
            <h2>
              {selectedOption === "All"
                ? `All ${title} Games`
                : `${selectedOption} Games`}
            </h2>
          </div>

          <p>
            Showing <strong>{games.length}</strong> results
          </p>
        </div>

        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onClick={setSelectedGame} />
          ))}
        </div>
      </section>
    </section>
  );
}

function GameCard({ game, onClick }) {
  return (
    <article className="game-card" onClick={() => onClick(game)}>
      <div className="image-wrap">
        <img src={game.image} alt={game.title} />
      </div>

      <div className="game-content">
        <p className="tag">{game.genre}</p>
        <h3>{game.title}</h3>

        <div className="metadata">
          <span>★ {game.rating || "N/A"}</span>
          <span>{game.players}</span>
          <span>{game.price}</span>
        </div>
      </div>
    </article>
  );
}

function GameModal({ game, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal"
        aria-label={`${game.title} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close" onClick={onClose}>
          ×
        </button>

        <p className="modal-heading">Game Preview</p>
        <h2>{game.title}</h2>

        <div className="modal-layout">
          <img src={game.image} alt={game.title} />

          <div className="modal-details">
            <span>🎮 {game.genre}</span>
            <span>⭐ {game.rating || "N/A"}</span>
            <span>👥 {game.players}</span>
            <span>💸 {game.price}</span>
          </div>
        </div>

        <p className="modal-description">{game.description}</p>

        <a
          className="game-link-button"
          href={game.gameUrl}
          target="_blank"
          rel="noreferrer"
        >
          View Game Page
        </a>
      </section>
    </div>
  );
}

export default App;
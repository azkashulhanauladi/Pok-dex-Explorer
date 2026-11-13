import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import StatusBox from "./components/StatusBox";
import SearchBar from "./components/SearchBar";
import PokemonDetailModal from "./components/PokemonDetailModal";
// Import komponen daftar & pagination buatan Anggota 2:
// import PokemonListSection from "./components/PokemonListSection";

export default function App() {
  // State untuk hasil pencarian (terhubung dengan SearchBar milik Anggota 3)
  const [searchState, setSearchState] = useState({
    isSearching: false,
    loading: false,
    error: "",
    result: null,
  });

  // State untuk modal detail (terhubung dengan PokemonDetailModal milik Anggota 3)
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  function handleResetSearch() {
    setSearchState({
      isSearching: false,
      loading: false,
      error: "",
      result: null,
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-800">
      {/* Header Responsif */}
      <header className="sticky top-0 z-30 bg-red-600 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Pokédex Explorer
            </h1>
            <p className="text-xs text-red-100 sm:text-sm">
              Jelajahi data Pokémon dari PokéAPI v2
            </p>
          </div>

          {/* Komponen Pencarian dari Anggota 3 */}
          <SearchBar
            isSearching={searchState.isSearching}
            onSearchStateChange={setSearchState}
            onReset={handleResetSearch}
          />
        </div>
      </header>

      {/* Konten Utama */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        {searchState.isSearching ? (
          // Mode Hasil Pencarian
          <>
            {searchState.loading && (
              <StatusBox type="loading" message="Mencari Pokémon..." />
            )}

            {!searchState.loading && searchState.error && (
              <StatusBox
                type="error"
                message={searchState.error}
                actionLabel="Kembali ke Daftar"
                onAction={handleResetSearch}
              />
            )}

            {!searchState.loading && !searchState.error && !searchState.result && (
              <StatusBox
                type="empty"
                message="Data Pokémon tidak tersedia."
                actionLabel="Kembali ke Daftar"
                onAction={handleResetSearch}
              />
            )}

            {!searchState.loading && searchState.result && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                <PokemonCard
                  key={searchState.result.id}
                  pokemon={searchState.result}
                  onSelect={(id) => setSelectedPokemonId(id)}
                />
              </div>
            )}
          </>
        ) : (
          // Mode Daftar Utama + Pagination (diisi komponen Anggota 2)
          // Contoh pemanggilan komponen Anggota 2:
          // <PokemonListSection onSelectPokemon={(id) => setSelectedPokemonId(id)} />
          <StatusBox
            type="empty"
            message="Pasang komponen daftar & pagination (Anggota 2) di bagian ini."
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Pokédex Explorer &bull; Data oleh PokéAPI
      </footer>

      {/* Modal Detail dari Anggota 3 */}
      <PokemonDetailModal
        pokemonId={selectedPokemonId}
        onClose={() => setSelectedPokemonId(null)}
      />
    </div>
  );
}
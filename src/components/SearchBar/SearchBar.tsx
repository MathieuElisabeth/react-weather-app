import React from 'react';
import './SearchBar.css';

type Props = {
  handleSearch: any,
  search: string,
  setSearch: any,
  error: string
};

const SearchBar: React.FC<Props> = ({ handleSearch, search, setSearch, error }: Props) => {
  return (
    <div className="searchbar-container">
      <h1>Découvrez la météo des différentes villes du monde</h1>
      <p>
        {error}
      </p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Chercher une ville (ex: london)"
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="search-btn">⌕</button>
      </form>
    </div>
  )
}

export default SearchBar;

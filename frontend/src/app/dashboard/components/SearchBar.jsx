

const SearchBar = () => {
    return(
            <div className="input-group search-container">
              <span className="input-group-text search-icon"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control search-input" placeholder="Search..." />
            </div>
    )
}

export default SearchBar;
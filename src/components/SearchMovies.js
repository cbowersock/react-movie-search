import React, {useState} from "react";
import MovieCard from "./MovieCard";

const SearchMovies = () => {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const search = async (event) => {
        event.preventDefault()
        const url = `https://api.themoviedb.org/3/search/movie?api_key=221fed7d90d6edddcf83cf6bdddd13aa&language=en-US&query=${query}&page=1`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form className="form" onSubmit={search}>
                <label 
                    htmlFor="query" 
                    className="label"
                >Movie Search</label>
                <input 
                    type="text" 
                    name="query" 
                    placeholder="ie Blade Runner" 
                    className="input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                    className="button" 
                    type="submit"
                >Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </div>
    )
}

export default SearchMovies;
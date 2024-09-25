import React from 'react';
import './SearchResults.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SearchResults = ({ img, location, title, description, star, price, total }) => {
    return (
        <div className='search-result'>
            <img src={img} alt={title} />
            <FavoriteBorderIcon className='favorite-icon' />
            <div className='search-result-info'>
                <div className='search-result-info-top'>
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className='search-result-info-bottom'>
                    <div className='search-result-stars'>
                        <p className='search-result-star'><strong>{star}</strong></p>
                    </div>
                    <div className='search-result-price'>
                        <h2>{price}</h2>
                        <p>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
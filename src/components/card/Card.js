import React from 'react';
import './Card.css';

const Card = ({ src, title, description, price }) => {
  // Data for the cards
  const cardData = [
    {
      id: 1,
      title: 'Capetown',
      description: 'Experience the romance of Capetown with iconic landmarks and charming streets.',
      image: 'https://i.etsystatic.com/45137726/r/il/8a74a2/5701125857/il_600x600.5701125857_l2qv.jpg'
    },
    {
      id: 2,
      title: 'Durban',
      description: 'Explore the vibrant city life and famous attractions of Durban.',
      image: 'https://i.etsystatic.com/16843316/c/2230/2230/348/0/il/ea0036/5912969767/il_600x600.5912969767_f3r2.jpg'
    },
    {
      id: 3,
      title: 'Sandton',
      description: 'Immerse yourself in the bustling cityscape and rich culture of Sandton.',
      image: 'https://i.etsystatic.com/41337852/r/il/010182/5910235539/il_600x600.5910235539_2su3.jpg'
    },
    {
      id: 4,
      title: 'Joburg',
      description: 'Discover the ancient history and beautiful architecture of Joburg.',
      image: 'https://i.etsystatic.com/9019766/r/il/e17940/6208286403/il_600x600.6208286403_fy2u.jpg'
    },
    {
      id: 5,
      title: 'Lanseria',
      description: 'Enjoy the stunning views and laid-back atmosphere of Lanseria.',
      image: 'https://i.etsystatic.com/31625290/r/il/beb4e0/4019164806/il_600x600.4019164806_k713.jpg'
    }
  ];

  return (
    <div className="card-container">
      <h2 className="card-title">Inspiration for Your Next Trip</h2>
      <div className="card-items">
        {cardData.map((card) => (
          <div key={card.id} className="card-item">
            <img src={card.image} alt={card.title} className="item-image" />
            <h3 className="item-title">{card.title}</h3>
            <p className="item-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

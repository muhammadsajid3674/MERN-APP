import { useNavigate } from "react-router-dom";

const SearchCard = ({ imageUrl, name, id }) => {
    const image = require(`../../${imageUrl}`)

    const navigate = useNavigate();
    return (
        <div className='d-flex align-items-center p-2 gap-2' onClick={() => { navigate('/product/' + id) }}>
            <img
                src={image}
                width={50}
                height={50}
                style={{ objectFit: 'contain' }}
                alt={name}
            />
            <p className="text-dark mb-0">{name.slice(0, 15)}...</p>
        </div>
    );
};

export default SearchCard;

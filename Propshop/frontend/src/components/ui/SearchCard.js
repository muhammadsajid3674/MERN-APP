const SearchCard = ({ imageUrl, name }) => {
    return (
        <div className='flex items-center p-5 gap-5'>
            <img
                src={imageUrl}
                width={50}
                height={50}
                className='object-contain'
                alt={name}
            />
            <p className="h5">{name}</p>
        </div>
    );
};

export default SearchCard;

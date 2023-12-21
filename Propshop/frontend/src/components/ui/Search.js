import React from "react";
import SearchCard from "./SearchCard";
import Loader from "../Loader";

const Search = ({ visible, loading, data }) => {
    return (
        <div
            className={`${visible ? "" : "hidden"} bg-cardLight shadow-md rounded-md absolute w-full top-12 z-20`}
        >
            {loading ? (
                <div className='flex justify-center p-5'>
                    <Loader />
                </div>
            ) : (
                data &&
                data.map((res) => (
                    <SearchCard imageUrl={res.imageUrl} name={res.name} />
                ))
            )}
        </div>
    );
};

export default Search;

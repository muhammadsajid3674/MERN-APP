import React from "react";
import SearchCard from "./SearchCard";
import Loader from "../Loader";

const Search = ({ visible, loading, data }) => {
    return (
        <div
            className={`${visible ? "" : "invisible"} bg-white shadow position-absolute w-100`}
            style={{ top: "2.5rem", zIndex: 10 }}
        >
            {data && data.length > 0 ?
                data.map((res) => (
                    <SearchCard imageUrl={res.image} name={res.name} id={res._id} />
                )) : (
                    <p className="text-dark text-center mb-0">No Product Found</p>
                )
            }
        </div>
    );
};

export default Search;

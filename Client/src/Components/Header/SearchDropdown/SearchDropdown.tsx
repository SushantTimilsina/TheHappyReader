import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "utils/axiosInterceptors";

interface PropsInterface {
  searchKeyword: string;
}

const SearchDropdown: React.FC<PropsInterface> = (props) => {
  const { searchKeyword } = props;

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [searchError, setSearchError] = useState("");

  // fetching Products in search
  useEffect(() => {
    if (!searchKeyword) return;
    setIsSearching(true);
    const delaySearch = setTimeout(() => {
      const fetchSearchProduct = async () => {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
        };
        try {
          const response = await axiosInstance.get(
            `/api/products/search?search=${searchKeyword}`,
            { headers }
          );
          setSearchedProducts(response.data);
          setIsSearching(false);
        } catch (e) {
          console.log(e);
          setSearchError(e?.response?.message || "Unable to Search Products");
          setIsSearching(false);
        }
      };
      fetchSearchProduct();
    }, 500);
    // clearing timeout
    return () => clearTimeout(delaySearch);
  }, [searchKeyword]);

  return (
    <div>
      {searchKeyword && (
        <div className="absolute w-full bg-white border-2 border-gray-500 h-auto left-0 top-10 max-h-96 overflow-auto">
          {isSearching ? (
            // loading state
            <p className="text-gray-500 p-4">Searching...</p>
          ) : searchError ? (
            // search error
            <p className="text-red p-4">{searchError}</p>
          ) : searchedProducts?.length === 0 ? (
            // empty products
            <p className="text-gray-500 p-4 ">No Products Found</p>
          ) : (
            <>
              {/* Searched Products Listing starts */}
              {searchedProducts?.slice(0, 5)?.map((product: any, i: any) => {
                return (
                  <Link
                    className="text-gray-500 p-4 block border-t-2"
                    to={`/shop/${product._id}`}
                    key={i}
                  >
                    {product.name}
                  </Link>
                );
              })}
              {/* Searched Products Listing ends */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

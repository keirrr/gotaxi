import SearchResultItem from "./SearchResultItem";

import ReactLoading from "react-loading";

const SearchResultsList = (props) => {
  const { searchResults } = props;

  console.log(searchResults.data);

  return (
    <div
      className={`${
        searchResults.data == null && "flex items-start justify-center"
      } h-[230px] mb-[10px] overflow-y-scroll scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
    >
      {searchResults.data != null ? (
        searchResults.data.map((result) => (
          <SearchResultItem key={result.place_id} result={result} />
        ))
      ) : (
        <ReactLoading type="bubbles" color="#9CA3AF" />
      )}
    </div>
  );
};

export default SearchResultsList;

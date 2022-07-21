import SearchResultItem from "./SearchResultItem";

import ReactLoading from "react-loading";

const SearchResultsList = (props) => {
  const { searchResults, searchingType } = props;

  // Add processed locations to array (with names and coords)
  let newSearchResults = [];

  if (searchResults.data) {
    searchResults.data.forEach((result) => {
      const { tourism, city, house_number, road } = result.address;

      let address;

      if (house_number == null && road == null) {
        address = `${city}`;
      } else if (house_number == null) {
        address = `${road}, ${city}`;
      } else if (house_number == null && tourism == null) {
        address = `${road}, ${city}`;
      } else if (house_number == null && tourism != null) {
        address = `${tourism}, ${road}, ${city}`;
      } else if (house_number != null && tourism == null) {
        address = `${road} ${house_number}, ${city}`;
      } else if (house_number != null && tourism != null) {
        address = `${tourism}, ${road} ${house_number}, ${city}`;
      }

      newSearchResults.push({
        place_id: result.place_id,
        address: address,
        lat: result.lat,
        lng: result.lon,
      });
    });
  }

  // Filter locations with undefined name
  const filteredSearchResults = newSearchResults.filter((result) => {
    return result.address !== "undefined";
  });

  // Filter locations with duplicated name
  let filtered2SearchResults = [];
  let searchResultsAddresses = [];

  console.log("FILTR");
  console.log(searchResultsAddresses);
  for (let i = 0; i < filteredSearchResults.length; i++) {
    if (!searchResultsAddresses.includes(filteredSearchResults[i].address)) {
      console.log("hm");
      filtered2SearchResults.push(filteredSearchResults[i]);
    }

    searchResultsAddresses.push(filteredSearchResults[i].address);
  }

  const type = searchingType;

  return (
    <div
      className={`${
        filtered2SearchResults == null && "flex items-start justify-center"
      } h-[230px] mb-[10px] overflow-y-scroll scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
    >
      {filtered2SearchResults != null ? (
        filtered2SearchResults.map((result) => (
          <SearchResultItem
            key={result.place_id}
            result={result}
            searchingType={type}
          />
        ))
      ) : (
        <ReactLoading type="bubbles" color="#9CA3AF" />
      )}
    </div>
  );
};

export default SearchResultsList;

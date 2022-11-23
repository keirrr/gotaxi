import RecentSearchItem from "./RecentSearchItem";

// Cookies
import { useCookies } from "react-cookie";

const RecentSearchResultsList = () => {
  const [cookies, setCookie] = useCookies();

  const searches = cookies["recent-searches"];

  return (
    <div>
      <p className="font-bold">Ostatnie wyszukiwania</p>
      {searches === undefined ? (
        <p>Brak poprzednich wyszukiwań 😥</p>
      ) : (
        <>
          {Array.isArray(searches) ? (
            searches.map((result, index) => {
              return <RecentSearchItem key={index} locationInfo={result} />;
            })
          ) : (
            <RecentSearchItem
              startLocationName={cookies["recent-searches"].startLocationName}
              destLocationName={cookies["recent-searches"].destLocationName}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RecentSearchResultsList;

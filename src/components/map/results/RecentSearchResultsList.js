import RecentSearchItem from "./RecentSearchItem";

const RecentSearchResultsList = () => {
  return (
    <div>
      <p className="font-bold">Ostatnie wyszukiwania</p>
      <RecentSearchItem />
      <RecentSearchItem />
      <RecentSearchItem />
    </div>
  );
};

export default RecentSearchResultsList;

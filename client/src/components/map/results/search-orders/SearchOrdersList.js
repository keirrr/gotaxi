import SearchOrderItem from "./SearchOrderItem";

const SearchOrdersList = () => {
  return (
    <div>
      <SearchOrderItem type="regular" />
      <SearchOrderItem type="comfort" />
      <SearchOrderItem type="express" />
      <SearchOrderItem type="walk" />
    </div>
  );
};

export default SearchOrdersList;

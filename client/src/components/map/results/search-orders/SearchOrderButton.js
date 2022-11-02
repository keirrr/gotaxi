import { useSelector } from "react-redux";

import Button from "../../../buttons/Button";

const SearchOrderButton = () => {
  const { selectedItem } = useSelector((state) => state.orderInfo);

  const selectedItemName =
    selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1);

  return (
    <>
      <Button name={`Wybierz: Taxi${selectedItemName}`} />
    </>
  );
};

export default SearchOrderButton;

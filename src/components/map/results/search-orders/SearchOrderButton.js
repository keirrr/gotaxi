import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Button from "../../../buttons/Button";

const SearchOrderButton = () => {
  const navigate = useNavigate();
  const { selectedItem } = useSelector((state) => state.orderInfo);

  const selectedItemName =
    selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1);

  return (
    <>
      <Button
        name={`Wybierz: Taxi${selectedItemName}`}
        clickFunc={() => navigate("/order/confirm")}
      />
    </>
  );
};

export default SearchOrderButton;

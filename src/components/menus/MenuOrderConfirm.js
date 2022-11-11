// Router
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../../store/notificationSlice";

import SearchOrderPathInfo from "../map/results/search-orders/SearchOrderPathInfo";
import Button from "../buttons/Button";

import { IoChevronBack } from "react-icons/io5";

const MenuOrderConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { price } = useSelector((state) => state.locationInfo);

  const confirmHandler = () => {
    dispatch(setContent("Potwierdzono przejazd!"));
    navigate("/order/waiting");
  };

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link to="/">
          <button className="relative p-1 flex items-center w-[24px] h-[24px]">
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Zamawianie
        </span>
      </div>
      <form
        className="flex flex-col justify-end items-end"
        onSubmit={confirmHandler}
      >
        <SearchOrderPathInfo />
        <div className="flex flex-col justify-end items-end">
          <span className="w-fit mt-[10px] text-lg text-gray-900 leading-none">
            Cena
          </span>
          <span className="w-fit text-2xl font-bold leading-tight">
            {price === "FREE" ? "FREE" : price + "zł"}
          </span>
        </div>
        <Button name="Potwierdź" />
      </form>
    </section>
  );
};

export default MenuOrderConfirm;

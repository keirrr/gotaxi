import { IoChevronForward, IoPerson, IoTime } from "react-icons/io5";

const WhiteButton = ({ name, icon, path }) => {
  const navigateTo = () => {
    console.log("XD");
  };

  return (
    <button
      onClick={navigateTo}
      className="flex justify-between items-center w-full h-[60px] mt-[5px] bg-gray-200 rounded-[10px] transition-colors hover:bg-gray-300 active:bg-gray-400"
    >
      <div className="flex items-center">
        <div className="p-[10px]">
          {icon === "edit-profile" && (
            <IoPerson color="#111827" className="w-[24px] h-[24px]" />
          )}
          {icon === "orders-history" && (
            <IoTime color="#111827" className="w-[24px] h-[24px]" />
          )}
        </div>
        <p className="font-bold">{name}</p>
      </div>
      <div className="flex items-center p-[10px]">
        <IoChevronForward color="#111827" className="w-[24px] h-[24px]" />
      </div>
    </button>
  );
};

export default WhiteButton;

const Button = (props, { clickFunc }) => {
  return (
    <button
      onClick={props.clickFunc}
      className={`h-[40px] w-full mt-[20px]  rounded-[10px] transition-colors ${
        props.important
          ? "bg-red-400 hover:bg-red-500 active:bg-red-300"
          : props.critical
          ? "bg-gray-800 hover:bg-black active:bg-gray-600 text-white"
          : "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-300"
      }`}
    >
      <span className="font-bold">{props.name}</span>
    </button>
  );
};

export default Button;

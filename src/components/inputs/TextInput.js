const TextInput = (props) => {
  return (
    <input
      type={props.inputType}
      placeholder={props.placeholder}
      onChange={(e) =>
        props.updateState(props.elemToUpdate, e.target.value.trim())
      }
      className="h-[40px] w-full px-[10px] mt-[10px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600"
    />
  );
};

export default TextInput;

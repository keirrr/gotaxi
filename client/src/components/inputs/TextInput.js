const TextInput = (props) => {
  return (
    <input
      type={props.inputType}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      pattern={props.pattern}
      required
      onChange={(e) =>
        props.updateState(props.elemToUpdate, e.target.value.trim())
      }
      onBlur={() => props.checkInput()}
      className={`h-[40px] w-full px-[10px] mt-[10px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600 ${!props.isValid && "ring-2 ring-red-500"}`}
    />
  );
};

export default TextInput;

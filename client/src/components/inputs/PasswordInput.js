import { IoEye, IoEyeOff } from "react-icons/io5";

import { useState } from "react";

const PasswordInput = (props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [type, setType] = useState(props.inputType);

  const showPasswordHandler = (e) => {
    e.preventDefault();

    if (isPasswordShown) {
      setIsPasswordShown(false);
      setType(props.inputType);
    } else {
      setIsPasswordShown(true);
      setType("text");
    }
  };

  return (
    <div className="relative flex">
      <input
        type={type}
        className={`h-[40px] w-full px-[10px] mt-[10px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600 ${
          !props.isValid && "ring-2 ring-red-500"
        }`}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        pattern={props.pattern}
        required
        onChange={(e) =>
          props.updateState(props.elemToUpdate, e.target.value.trim())
        }
        onBlur={() => props.checkInput()}
      />
      <div className="absolute w-[20px] h-[20px] right-2 mt-[5px] top-1/2 -translate-y-1/2">
        <input
          className="absolute w-full h-full"
          tabIndex="-1"
          onClick={showPasswordHandler}
          type="button"
        />
        {!isPasswordShown && (
          <IoEye color="#111827" className="w-[20px] h-[20px]" />
        )}
        {isPasswordShown && (
          <IoEyeOff color="#111827" className="w-[20px] h-[20px]" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;

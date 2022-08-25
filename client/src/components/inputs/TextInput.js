const TextInput = (props,  {setValue}) => {
    return (
        <input type="text" placeholder={props.placeholder} onChange={(e) => {setValue = e.target.value.trim(); console.log(setValue)}} className="h-[40px] w-full px-[10px] mt-[10px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600" />
    )
}

export default TextInput;
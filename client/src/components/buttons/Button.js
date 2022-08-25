const Button = (props, {clickFunc}) => {
    return (
        <button onClick={props.clickFunc} className="h-[40px] w-full mt-[20px] bg-yellow-400 rounded-[10px] transition-colors hover:bg-yellow-300 active:bg-yellow-500">
            <span className="font-bold">{props.name}</span>
        </button>
    )
}

export default Button;
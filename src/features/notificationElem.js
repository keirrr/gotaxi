const NotificationElem = (props) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[75px] h-[50px] w-[400px] opacity-0 animate-slide">
      <div className="absolute z-0 h-full w-full bg-gray-900 opacity-80 rounded-[10px]"></div>
      <p className="absolute z-1 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-bold text-white">
        {props.content}
      </p>
    </div>
  );
};

export default NotificationElem;

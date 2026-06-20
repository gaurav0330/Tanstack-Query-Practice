export const Tooltip = ({ children, content, position = "top" }) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 w-max max-w-sm p-4 bg-gray-800 text-white text-sm rounded-xl shadow-xl ${positionClasses[position]}`}
      >
        {content}
        {/* Little triangle arrow pointing to the element */}
        <div 
            className={`absolute w-3 h-3 bg-gray-800 transform rotate-45
            ${position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2' : ''}
            ${position === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2' : ''}
            ${position === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2' : ''}
            ${position === 'right' ? 'left-[-6px] top-1/2 -translate-y-1/2' : ''}
        `} />
      </div>
    </div>
  );
};

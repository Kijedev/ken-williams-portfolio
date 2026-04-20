export default function Button({
    text = "Button",
    fromColor = "from-indigo-500",
    toColor = "to-indigo-600",
    textColor = "text-white",
    border = "border border-white",
}) {
    return (
        <button
            className={`
        cursor-pointer
        bg-linear-to-b ${fromColor} ${toColor}
        px-6 py-3 rounded-xl
        border border-white/20
        font-medium group z-50 w-fit
        ${textColor}
      `}
        >
            <div className="relative overflow-hidden h-7">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    {text}
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    {text}
                </p>
            </div>
        </button>
    );
}

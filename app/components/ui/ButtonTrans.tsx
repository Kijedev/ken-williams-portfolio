export default function ButtonTrans({
    text = "Button",
    textsecond = "Button",
    fromColor = "from-transparent",
    toColor = "to-transparent",
    textColor = "text-white",
    border = "border border-white",
}) {
    return (
        <a
            href="https://www.instagram.com/darawilliam.s/"
            target="_blank"
            className={`
        cursor-pointer
        bg-transparent
        px-6 py-3 rounded-full
        border border-white/20
        font-medium group z-50 w-fit
        ${textColor}
      `}
        >
            <div className="relative overflow-hidden h-7">
                <p className="group-hover:-translate-y-7 text-center duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    {text}
                </p>
                <p className="absolute top-7 left-0 w-full text-center flex justify-center items-center group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    {textsecond}
                </p>
            </div>
        </a>
    );
}

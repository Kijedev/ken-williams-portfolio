import type { Metadata } from "next";
import SplitText from "../components/ui/SplitText";

export const metadata: Metadata = {
    title: "",
    description: "",
};

export default function Revolutionalize() {
    return (
        <main className="h-screen relative z-50 bg-[#010101] border border-t-white/10">
            <div className="flex flex-col pt-20 pl-10">
                <h1 className="text-white text-[10rem]">Revolutionalizing</h1>
                {/* <SplitText /> */}
                <h1 className="text-white text-[10rem] -mt-20 font-semibold italic">Product</h1>
                <h1 className="text-white text-[10rem] -mt-20">Visualization</h1>
            </div>
        </main>
    );
}
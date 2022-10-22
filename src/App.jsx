import React from "react";
import { Link } from "react-router-dom";
import { Mic, Volume2 } from "react-feather";

const buttonClassName =
    "rounded-3xl p-4 w-full font-bold bg-gray-500 hover:bg-gray-400 border-4 border-gray-600 font-mono flex flex-row items-center";
const iconClassName = "p-3 bg-gray-600 mr-4 rounded-full inline";

function App() {
    return (
        <div className="flex flex-col items-center h-full">
            <h1 className="text-5xl font-bold mb-5">Radio Broadcast</h1>
            <div className="space-y-3 flex flex-col items-center w-max">
                <Link to="/host" className="w-full">
                    <button type="button" className={buttonClassName}>
                        <div className={iconClassName}>
                            <Mic size={32} />
                        </div>
                        Become the host
                    </button>
                </Link>
                <Link to="/listen" className="w-full">
                    <button type="button" className={buttonClassName}>
                        <div className={iconClassName}>
                            <Volume2 size={32} />
                        </div>
                        Tune in
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default App;

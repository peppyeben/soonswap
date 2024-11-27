import React, { useState } from "react";

export const Swap = () => {
    const [swapDetails, setSwapDetails] = useState({
        from: {
            token: "",
            amount: "",
        },
        to: {
            token: "",
            amount: "",
        },
    });

    const handleTokenChange = (section: any, value: any) => {
        // Validate token input (allow alphanumeric and some special characters)
        const sanitizedValue = value.replace(/[^a-zA-Z0-9\-_./]/g, "");

        setSwapDetails((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                token: sanitizedValue,
            },
        }));
    };

    const handleAmountChange = (section: any, value: any) => {
        // Allow only decimal numbers up to 4 decimal places
        const sanitizedValue = value.replace(/[^0-9.]/g, "");

        // Ensure only one decimal point
        const decimalParts = sanitizedValue.split(".");
        let formattedValue = decimalParts[0];

        if (decimalParts.length > 1) {
            formattedValue += "." + decimalParts[1].slice(0, 4);
        }

        setSwapDetails((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                amount: formattedValue,
            },
        }));
    };

    const handleSwap = () => {
        console.log("Swap Details:", swapDetails);
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#001400] to-[#003000] p-4 w-full">
            <section className="flex rounded-2xl flex-col justify-center space-y-4 items-center max-w-[32rem] w-full px-6 py-6 shadow-2xl bg-[#0a2a0a] border-2 border-[#1a4a1a]">
                <div className="w-full">
                    <h2 className="text-2xl font-bold text-[#CFFFCF] mb-4 text-center">
                        Token Swap
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-[#002900] rounded-xl p-4">
                            <p className="text-lg font-bold text-[#CFFFCF] mb-2">
                                From
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-[#CFFFCF] mb-1">
                                        Token
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg py-3 text-[#CFFFCF] px-4 outline-none border-2 border-transparent focus:border-[#1a4a1a] placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#001a00] transition-all duration-300"
                                        placeholder="Enter token address"
                                        value={swapDetails.from.token}
                                        onChange={(e) =>
                                            handleTokenChange(
                                                "from",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#CFFFCF] mb-1">
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg py-3 text-[#CFFFCF] px-4 outline-none border-2 border-transparent focus:border-[#1a4a1a] placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#001a00] transition-all duration-300"
                                        placeholder="Enter amount"
                                        value={swapDetails.from.amount}
                                        onChange={(e) =>
                                            handleAmountChange(
                                                "from",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-12 h-12 bg-[#1a4a1a] rounded-full flex items-center justify-center text-[#CFFFCF] font-bold">
                                ↓
                            </div>
                        </div>

                        <div className="bg-[#002900] rounded-xl p-4">
                            <p className="text-lg font-bold text-[#CFFFCF] mb-2">
                                To
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-[#CFFFCF] mb-1">
                                        Token
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg py-3 text-[#CFFFCF] px-4 outline-none border-2 border-transparent focus:border-[#1a4a1a] placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#001a00] transition-all duration-300"
                                        placeholder="Enter token address"
                                        value={swapDetails.to.token}
                                        onChange={(e) =>
                                            handleTokenChange(
                                                "to",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#CFFFCF] mb-1">
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg py-3 text-[#CFFFCF] px-4 outline-none border-2 border-transparent focus:border-[#1a4a1a] placeholder-[#CFFFCF] placeholder-opacity-40 bg-[#001a00] transition-all duration-300"
                                        placeholder="Enter amount"
                                        value={swapDetails.to.amount}
                                        onChange={(e) =>
                                            handleAmountChange(
                                                "to",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="w-full mt-6 bg-[#1a4a1a] hover:bg-[#2a6a2a] text-[#CFFFCF] py-3 rounded-lg transition-colors duration-300 font-bold"
                    >
                        Swap Tokens
                    </button>
                </div>
            </section>
        </main>
    );
};

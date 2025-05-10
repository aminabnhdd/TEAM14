
// popup to indicate that the password was reinitialized

import { useNavigate } from "react-router-dom";

function AttendreMDP({ popUp, foncone }) {
    const navigate = useNavigate();

    function close() {
        foncone();
    }

    return (
        popUp && (
            <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
                <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
                        onClick={close}
                    >
                        &times;
                    </button>

                    {/* Title */}
                    <div className="text-center font-semibold text-[22px]">
                        <p>Mot de passe réinitialisé !</p>
                    </div>

                    {/* Message */}
                    <p className="text-md text-black text-center leading-relaxed">
                        Votre mot de passe a été <span className="text-success">réinitialisé avec succès.</span> Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                    </p>
                </div>
            </div>
        )
    );
}

export default AttendreMDP;
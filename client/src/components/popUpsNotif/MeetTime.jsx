import axios from "axios";
import AuthContext from "../../helpers/AuthContext";
import { useContext, useState, useEffect } from "react";
import i from "../../assets/x.png";

function MeetTime({ popUp, close, notif, handleSeen }) {
    const { authState } = useContext(AuthContext);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");
    const [hasValidationError, setHasValidationError] = useState(false);

    // Set default to next weekend (Friday or Saturday) at 10 AM
    useEffect(() => {
        if (popUp) {
            const today = new Date();
            const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
            let daysToAdd = 5 - dayOfWeek; // Days until Friday
            
            // If today is Friday or Saturday, schedule for next week
            if (dayOfWeek >= 5) {
                daysToAdd += 7;
            } else if (dayOfWeek === 6) { // If today is Saturday
                daysToAdd = 6; // Next Friday (6 days from Sunday)
            }
            
            const nextWeekend = new Date(today);
            nextWeekend.setDate(today.getDate() + daysToAdd);
            
            // Format date as YYYY-MM-DD
            const formattedDate = nextWeekend.toISOString().split('T')[0];
            
            setDate(formattedDate);
            setTime("10:00");
            setError("");
            setHasValidationError(false);
        }
    }, [popUp]);

    const validateDateTime = () => {
        if (!date || !time) {
            setError("Veuillez sélectionner une date et une heure");
            setHasValidationError(true);
            return false;
        }

        const selectedDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        
        if (selectedDateTime <= now) {
            setError("La date et l'heure doivent être ultérieures à maintenant");
            setHasValidationError(true);
            return false;
        }
        
        setError("");
        setHasValidationError(false);
        return true;
    };

    const validate = (action) => {
        if (!validateDateTime()) {
            return; // Prevent confirmation if validation fails
        }
        
        axios.put(`http://localhost:3001/notifications/valider/${notif.conflitId}`, 
            { decision: action, notifId: notif._id, projetId: notif.projetId, date, time }, 
            { headers: { Authorization: `Bearer ${authState.accessToken}` }})    
            .then((response) => {
                console.log(response.data);
                close();
                if (action === "accept") {
                    handleSeen(notif._id, "conflit");
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Erreur lors de la validation");
                setHasValidationError(true);
            });
    };

    useEffect(() => {
        document.body.style.overflow = popUp ? "hidden" : "auto";
    }, [popUp]);

    return (
        popUp && (
            <>
                <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/10">
                    <div className="relative z-[11000] w-[28%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
                        <div className="text-center font-semibold text-[22px] mb-4">
                            <p>Conflit Signalé</p>
                        </div>

                        <img
                            className="absolute top-5 right-5 w-[25px] h-[25px] cursor-pointer hover:filter hover:invert-[18%] hover:sepia hover:saturate-[7497%] hover:hue-rotate-[1deg] hover:brightness-101 hover:contrast-104"
                            src={i}
                            alt="Close"
                            onClick={close}
                        />

                        <div className="text-[13px] font-medium text-justify z-[1100]">
                       <p> Veuillez choisir la date et l’heure de la réunion entre experts pour résoudre le conflit signalé. Un lien Google Meet sera automatiquement ajouté aux agendas des participants.</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold mb-1" htmlFor="date">
                                    Date (Mois/Jour/Année)
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    value={date}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        setError("");
                                        setHasValidationError(false);
                                    }}
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold mb-1" htmlFor="time">
                                    Temps
                                </label>
                                <input
                                    id="time"
                                    type="time"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                        setError("");
                                        setHasValidationError(false);
                                    }}
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            {error && (
                                <div className="text-red-500 text-sm mt-1">{error}</div>
                            )}
                        </div>

                        <div className="flex justify-center gap-8">
                            <button
                                className={`flex w-[40%] py-3 justify-center items-center rounded-[27px] ${hasValidationError ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"} text-white font-semibold transition-colors`}
                                onClick={() => validate("accept")}
                                disabled={hasValidationError}
                            >
                                Confirmer
                            </button>
                            <button
                                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-red-500 text-white font-semibold transition-colors hover:bg-red-700"
                                onClick={close}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default MeetTime;
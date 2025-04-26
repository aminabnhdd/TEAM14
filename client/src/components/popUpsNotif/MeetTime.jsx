import axios from "axios"
import  AuthContext from "../../helpers/AuthContext"
import {useContext, useState,useEffect} from "react"
import i from "../../assets/x.png"

function MeetTime({ popUp, close, notif,handleSeen }) {
        const {authState} = useContext(AuthContext);
    
        const [date, setDate] = useState("");
        const [time, setTime] = useState("");
      
        const validate = (action) => {
          console.log("Selected Date:", date);
          console.log("Selected Time:", time);        axios.put(`http://localhost:3001/notifications/valider/${notif.conflitId}`,{decision:action,notifId:notif._id,projetId:notif.projetId},{headers:{Authorization:`Bearer ${authState.accessToken}`}})    
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
            console.log(notif)
        })
    }
  useEffect(() => {
    document.body.style.overflow = popUp ? "hidden" : "auto"; // Optional: prevent scrolling behind popup
  }, [popUp]);

  return (
    popUp  && (
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
            <p>
              Veuillez choisir la date et le temps pour la séance de chat
            </p>
          </div>

 <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                onChange={(e) => setTime(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          
          
            <div className="flex justify-center gap-8">
              <button
                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-green-500 text-white font-semibold transition-colors hover:bg-green-700"
                onClick={() => {
                  close();
                  validate("accept");
                  handleSeen(notif._id, "conflit");
                }}
              >
                Confirmer
              </button>
              <button
                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-red-500 text-white font-semibold transition-colors hover:bg-red-700"
                onClick={() => {
                  close();
                  
                }}
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

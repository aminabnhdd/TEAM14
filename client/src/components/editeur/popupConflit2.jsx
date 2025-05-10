// popup that appears after the user entered a new conflict, telling him to wait for the chef de projet's approval

export default function PopConflit2({ onClose }) {
  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
      <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <div className="text-center font-semibold text-[22px]">
          <p>Signaler un conflit</p>
        </div>

        {/* Info Message */}
        <p className="text-md text-black text-center leading-relaxed">
          Le conflit doit être <span className="text-success">validé </span>par le chef du projet avant d'être affiché. Veuillez attendre qu'une notification vous arrive.
        </p>
      </div>
    </div>
  );
}

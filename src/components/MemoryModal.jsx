function MemoryModal({ memory, onClose }) {
  const isPhotoMemory = memory.type === "photo" && memory.image;
  const isLetterMemory = memory.type === "letter";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className={`modal memory-modal ${
          isPhotoMemory ? "photo-memory-modal" : ""
        } ${isLetterMemory ? "letter-memory-modal" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        {isPhotoMemory && (
          <div className="floating-photo-frame">
            <div className="floating-photo-inner">
              <img
                src={memory.image}
                alt={memory.title}
                className="floating-photo-image"
              />
            </div>
          </div>
        )}

        {isLetterMemory ? (
          <div className="letter-paper">
            <p className="letter-label">Letter</p>
            <h2>{memory.title}</h2>

            <p className="letter-greeting">Dear. 너에게</p>

            <p className="letter-content">{memory.content}</p>

            <p className="letter-sign">From. 나</p>

            <button onClick={onClose}>닫기</button>
          </div>
        ) : (
          <div className="memory-text-box">
            <p className="memory-label">Memory</p>
            <h2>{memory.title}</h2>
            <p>{memory.content}</p>

            <button onClick={onClose}>닫기</button>
          </div>
        )}
      </article>
    </div>
  );
}

export default MemoryModal;
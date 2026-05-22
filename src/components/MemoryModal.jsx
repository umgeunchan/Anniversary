function MemoryModal({ memory, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="modal" onClick={(event) => event.stopPropagation()}>
        <h2>{memory.title}</h2>
        <p>{memory.content}</p>
        <button onClick={onClose}>닫기</button>
      </article>
    </div>
  );
}

export default MemoryModal;
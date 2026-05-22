function StartScreen({ onStart }) {
  return (
    <section className="start-screen">
      <div className="start-content">
        <p className="start-eyebrow">Happy 1st Anniversary!</p>

        <h1 className="start-title">
          우리를 위한 작은 공간
        </h1>

        <p className="start-description">
          오늘을 위해 준비한 추억의 테이블이야
        </p>

        <button className="enter-button" onClick={onStart}>
          눌러봐!
        </button>
      </div>
    </section>
  );
}

export default StartScreen;
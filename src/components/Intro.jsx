import { useEffect, useState } from "react";

const lines = [
  "> 보화야 안녕! 오늘은 우리한테 엄청 특별한 날이야!",
  "> 그동안 우리가 함께한 시간들을 조금씩 담아봤어",
  "> 내가 만든 이 작은 공간이 우리에게 좋은 추억이 되었으면 좋겠어",
  "> 테이블 위에서 우리의 추억들을 하나씩 눌러봐"
];

function Intro({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentLine = lines[lineIndex];

  useEffect(() => {
    setTypedText("");
    setIsTyping(true);

    let charIndex = 0;

    const typingTimer = setInterval(() => {
      setTypedText(currentLine.slice(0, charIndex + 1));
      charIndex += 1;

      if (charIndex >= currentLine.length) {
        clearInterval(typingTimer);
        setIsTyping(false);
      }
    }, 60);

    return () => clearInterval(typingTimer);
  }, [currentLine]);

  const handleNext = () => {
    if (isTyping) {
      setTypedText(currentLine);
      setIsTyping(false);
      return;
    }

    const nextCompletedLines = [...completedLines, currentLine];

    if (lineIndex < lines.length - 1) {
      setCompletedLines(nextCompletedLines);
      setLineIndex((prev) => prev + 1);
      return;
    }

    onComplete();
  };

  return (
    <section className="intro" onClick={handleNext}>
      <div className="terminal">
        {completedLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <p className="typing-line">
          {typedText}
          {isTyping && <span className="cursor">|</span>}
        </p>
      </div>
    </section>
  );
}

export default Intro;
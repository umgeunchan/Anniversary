import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, useTexture  } from "@react-three/drei";

/* -----------------------------
  기본 테이블
----------------------------- */
function Table() {
  return (
    <group position={[0, -0.55, 0]}>
      {/* 테이블 상판 */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.45, 2.6, 0.22, 96]} />
        <meshStandardMaterial
          color="#c89f7a"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* 테이블보 */}
      <mesh position={[0, 0.14, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.3, 2.45, 0.08, 96]} />
        <meshStandardMaterial
          color="#ffe3ec"
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* 중앙 케이크 매트 */}
      <mesh position={[0, 0.21, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.035, 96]} />
        <meshStandardMaterial color="#fff7ef" roughness={0.9} />
      </mesh>

      {/* 테이블 중앙 다리 */}
      <mesh position={[0, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.32, 1.55, 48]} />
        <meshStandardMaterial color="#9b6f50" roughness={0.75} />
      </mesh>

      {/* 테이블 받침 */}
      <mesh position={[0, -1.68, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.9, 1.05, 0.16, 64]} />
        <meshStandardMaterial color="#8b5e3c" roughness={0.75} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  바닥
----------------------------- */
function Floor({ isLightOn }) {
  return (
    <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[8, 96]} />
      <meshStandardMaterial
        color={isLightOn ? "#2a1b24" : "#050305"}
        roughness={0.95}
      />
    </mesh>
  );
}

/* -----------------------------
  일렁이는 촛불
----------------------------- */
function FlickeringFlame({ position = [0, 0, 0], size = 1 }) {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    const flicker =
      1 +
      Math.sin(time * 18) * 0.12 +
      Math.sin(time * 31) * 0.06 +
      Math.sin(time * 47) * 0.03;

    if (flameRef.current) {
      flameRef.current.scale.set(
        size * 0.75 * flicker,
        size * 1.45 * flicker,
        size * 0.75 * flicker
      );

      flameRef.current.position.x = position[0] + Math.sin(time * 9) * 0.008;
      flameRef.current.position.y = position[1] + Math.sin(time * 14) * 0.007;
      flameRef.current.position.z = position[2] + Math.cos(time * 10) * 0.008;
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        0.55 + Math.sin(time * 20) * 0.18 + Math.sin(time * 37) * 0.08;
    }
  });

  return (
    <group>
      {/* 바깥 불꽃 */}
      <mesh ref={flameRef} position={position}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color="#ffb347"
          emissive="#ff6b2c"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* 안쪽 작은 불꽃 */}
      <mesh position={[position[0], position[1] + 0.005, position[2]]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial
          color="#fff3a6"
          emissive="#ffd166"
          emissiveIntensity={2.5}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={position}
        intensity={0.65}
        distance={1.4}
        color="#ffc46b"
      />
    </group>
  );
}

/* -----------------------------
  작은 촛불
----------------------------- */
function MiniCandle({ position, onClick, isLit }) {
  return (
    <group position={position} onClick={onClick}>
      {/* 초 몸체 */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.28, 24]} />
        <meshStandardMaterial color="#fff7e6" roughness={0.7} />
      </mesh>

      {/* 심지 */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 12]} />
        <meshStandardMaterial color="#2b1a12" roughness={0.9} />
      </mesh>

      {isLit && <FlickeringFlame position={[0, 0.36, 0]} size={0.8} />}
    </group>
  );
}

/* -----------------------------
  케이크
----------------------------- */
function Cake({ onClick, isLit }) {
  return (
    <group position={[0, 0, 0]} onClick={onClick}>
      {/* 케이크 아래층 */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.85, 0.55, 64]} />
        <meshStandardMaterial color="#f8c8dc" roughness={0.75} />
      </mesh>

      {/* 케이크 윗층 */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.7, 0.18, 64]} />
        <meshStandardMaterial color="#fff1f5" roughness={0.8} />
      </mesh>

      {/* 케이크 초 */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 16]} />
        <meshStandardMaterial color="#ff8a65" roughness={0.65} />
      </mesh>

      {/* 심지 */}
      <mesh position={[0, 1.04, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.07, 12]} />
        <meshStandardMaterial color="#2b1a12" />
      </mesh>

      {isLit && <FlickeringFlame position={[0, 1.1, 0]} size={0.9} />}
    </group>
  );
}

/* -----------------------------
  선물상자
----------------------------- */
function GiftBox({ position, onClick }) {
  return (
    <group position={position} onClick={onClick}>
      {/* 상자 */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshStandardMaterial color="#ff9eb5" roughness={0.75} />
      </mesh>

      {/* 세로 리본 */}
      <mesh position={[0, 0.31, 0]} castShadow>
        <boxGeometry args={[0.11, 0.035, 0.54]} />
        <meshStandardMaterial color="#fff3a6" roughness={0.75} />
      </mesh>

      {/* 가로 리본 */}
      <mesh position={[0, 0.315, 0]} castShadow>
        <boxGeometry args={[0.54, 0.035, 0.11]} />
        <meshStandardMaterial color="#fff3a6" roughness={0.75} />
      </mesh>

      {/* 리본 매듭 */}
      <mesh position={[0, 0.39, 0]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#fff3a6" roughness={0.75} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  사진 액자
----------------------------- */
function PhotoFrame({
  position,
  rotation = [0, 0, 0],
  imageUrl,
  onClick,
}) {
  const photoTexture = imageUrl ? useTexture(imageUrl) : null;

  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* 액자 프레임 */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.65, 0.08]} />
        <meshStandardMaterial color="#f2c6a0" roughness={0.75} />
      </mesh>

      {/* 사진 영역 */}
      {photoTexture ? (
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[0.68, 0.45]} />
          <meshStandardMaterial map={photoTexture} roughness={0.8} />
        </mesh>
      ) : (
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.68, 0.45, 0.03]} />
          <meshStandardMaterial color="#fffaf0" roughness={0.8} />
        </mesh>
      )}

      {/* 받침대 */}
      <mesh position={[0, -0.42, -0.12]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[0.12, 0.42, 0.06]} />
        <meshStandardMaterial color="#b98b62" roughness={0.8} />
      </mesh>
    </group>
  );
}
/* -----------------------------
  편지
----------------------------- */
function Letter({ position, onClick }) {
  return (
    <group position={position} rotation={[0, 0.15, 0]} onClick={onClick}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.06, 0.65]} />
        <meshStandardMaterial color="#fff7e6" roughness={0.85} />
      </mesh>

      {/* 편지 접힘선 느낌 */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.72, 0.01, 0.02]} />
        <meshStandardMaterial color="#e8d8bd" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* -----------------------------
  파티 폭죽 파티클
----------------------------- */
function ConfettiPiece({ config }) {
  const ref = useRef();
  const startTimeRef = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    // Three.js clock 기준으로 시작 시간 저장
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;

    if (elapsed > config.life) {
      ref.current.visible = false;
      return;
    }

    ref.current.visible = true;

    const progress = elapsed / config.life;
    const gravity = -0.72 * elapsed * elapsed;

    ref.current.position.set(
      config.origin[0] + config.velocity[0] * elapsed,
      config.origin[1] + config.velocity[1] * elapsed + gravity,
      config.origin[2] + config.velocity[2] * elapsed
    );

    ref.current.rotation.x += config.rotationSpeed[0];
    ref.current.rotation.y += config.rotationSpeed[1];
    ref.current.rotation.z += config.rotationSpeed[2];

    ref.current.scale.setScalar(Math.max(0.15, 1 - progress * 0.65));

    if (ref.current.material) {
      ref.current.material.opacity = Math.max(0, 1 - progress);
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[config.size[0], config.size[1]]} />
      <meshStandardMaterial
        color={config.color}
        roughness={0.65}
        transparent
        opacity={1}
        side={2}
      />
    </mesh>
  );
}
function PartyPopper({ side = "left", triggerKey }) {
  const colors = [
    "#ff5c8a",
    "#ffd166",
    "#06d6a0",
    "#4dabf7",
    "#b197fc",
    "#ffffff",
    "#ff9f1c",
  ];

  const pieces = useMemo(() => {
    const origin = side === "left" ? [-2.85, 0.28, 0.85] : [2.85, 0.28, 0.85];
    const direction = side === "left" ? 1 : -1;

    return Array.from({ length: 120 }, (_, index) => {
      const strongBurst = index < 35;

      return {
        id: `${triggerKey}-${side}-${index}`,
        origin,
        velocity: [
          direction * (strongBurst ? 2.1 + Math.random() * 1.4 : 1.0 + Math.random() * 1.9),
          strongBurst ? 1.4 + Math.random() * 1.6 : 0.7 + Math.random() * 1.8,
          -1.15 + Math.random() * 2.3,
        ],
        rotationSpeed: [
          0.035 + Math.random() * 0.12,
          0.035 + Math.random() * 0.12,
          0.035 + Math.random() * 0.12,
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: [
          0.035 + Math.random() * 0.06,
          0.025 + Math.random() * 0.05,
        ],
        life: 1.5 + Math.random() * 1.15,
        startTime: 0,
      };
    });
  }, [side, triggerKey]);


  return (
    <group>
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} config={piece} />
      ))}

      {/* 파티 폭죽 콘 */}
      <mesh
        position={side === "left" ? [-2.95, 0.16, 0.85] : [2.95, 0.16, 0.85]}
        rotation={[3, 0, side === "left" ? 0.85 : -0.85]}
      >
        <coneGeometry args={[0.12, 0.42, 24]} />
        <meshStandardMaterial color="#4dabf7" roughness={0.5} />
      </mesh>

      {/* 폭죽 순간 조명 */}
      <pointLight
        position={side === "left" ? [-2.4, 1.0, 0.85] : [2.4, 1.0, 0.85]}
        intensity={1.8}
        distance={2.4}
        color="#ffd1dc"
      />
    </group>
  );
}

/* -----------------------------
  실제 3D 장면
----------------------------- */
function SceneContent({ onSelectMemory, isLightOn, fireworkKey, showPartyPopper}) {
  return (
    <>
      <color attach="background" args={[isLightOn ? "#1f141c" : "#030203"]} />

      {/* 방 전체 조명 */}
      <ambientLight intensity={isLightOn ? 0.85 : 0.025} />

      <directionalLight
        position={[3, 5, 4]}
        intensity={isLightOn ? 2.4 : 0.04}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight
        position={[-2.5, 2.2, 2.5]}
        intensity={isLightOn ? 1.2 : 0}
        color="#ffd1dc"
      />

      {/* 촛불이 켜졌을 때 테이블 중심에 은은한 빛 */}
      {isLightOn && (
        <pointLight
          position={[0, 1.1, 0.4]}
          intensity={0.75}
          distance={3}
          color="#ffc46b"
        />
      )}

      <Floor isLightOn={isLightOn} />
      <Table />

     {/* LIGHT ON 순간에만 잠깐 보이는 폭죽 */}
{showPartyPopper && (
  <>
    <PartyPopper
      key={`left-${fireworkKey}`}
      side="left"
      triggerKey={fireworkKey}
    />
    <PartyPopper
      key={`right-${fireworkKey}`}
      side="right"
      triggerKey={fireworkKey}
    />
  </>
)}

      <MiniCandle
        position={[-1.15, -0.35, -0.35]}
        isLit={isLightOn}
        onClick={() =>
          onSelectMemory({
            title: "작은 촛불",
            content: "마치 이 작은 불빛처럼, 우리 추억도 따뜻하게 남았으면 좋겠어!",
          })
        }
      />

      <MiniCandle
        position={[1.45, -0.35, 0.45]}
        isLit={isLightOn}
        onClick={() =>
          onSelectMemory({
            title: "작은 촛불",
            content: "오늘의 이 순간을 항상 기억하고 싶어!",
          })
        }
      />

      <GiftBox
        position={[1, -0.36, 1.2]}
        onClick={() =>
          onSelectMemory({
            title: "작은 선물",
            content: "아직 열어보지 않은 앞으로의 추억들을 너와 함께 만들고 싶어",
          })
        }
      />

      <Cake
        isLit={isLightOn}
        onClick={() =>
          onSelectMemory({
            title: "Anniversary Cake",
            content: "1주년 축하해!! 앞으로도 우리 오랫동안 함께하자!",
          })
        }
      />

      <PhotoFrame
  position={[-1.45, -0.05, 1.05]}
  rotation={[0, 0.8, 0]}
  imageUrl="/images/pic1.jpg"
  onClick={() =>
    onSelectMemory({
      type: "photo",
      title: "이때 기억나?",
      content: "벚꽃보러 갔을 때 너가 정말 너무 예뻐서 기억난다.\n그때 사진도 정말 많이 찍었지만 내 눈에 담은 네 모습이 아직도 선명한 것 같아. \n 우리 앞으로도 같이 사진 많이 찍으면서 예쁜 추억 많이 만들어가자!",
      image: "/images/pic1.jpg",
    })
  }
/>

<PhotoFrame
  position={[1.45, -0.05, -0.55]}
  rotation={[0, -0.3, 0]}
  imageUrl="/images/pic2.jpg"
  onClick={() =>
    onSelectMemory({
      type: "photo",
      title: "첫 눈 왔을 때!!",
      content: "이때 기억나? 나 시험공부 한다고 카페에서 같이 있다가 저녁 먹으러 나오니까 눈이 엄청 많이 왔잖아! 그때 너랑 같이 눈 맞으면서 걸었던 거 아직도 기억난다🤣 올해 첫 눈도 나랑 같이 봐줘~~!",
      image: "/images/pic2.jpg",
    })
  }
/>

      <Letter
  position={[0.95, -0.38, 1.25]}
  onClick={() =>
    onSelectMemory({
      type: "letter",
      title: "사랑하는 우리 보화",
      content:
        "1주년 축하해 보화야!!\n\n" +
        "처음에는 우리가 서로에게 이렇게까지 소중한 사람이 될 줄 몰랐는데,\n" +
        "우리가 함께 보내는 시간이 조금씩 쌓이면 쌓일수록 내 삶에 네가 틈틈히 박혀있다는게 느껴지는 것 같아!\n" +
        "별것 아닌 대화도, 같이 웃던 순간도, 조용히 함께 있던 시간도 전부 나에게는 오래 간직하고 싶은 기억들이야.\n" +
        "내가 만든 이 작은 공간이 내 마음을 전부 대신할 수는 없겠지만, 그래도 오늘만큼은 너에게 조금 더 특별한 하루가 되었으면 좋겠어!\n\n" +
        "우리 다투기도 많이 다투고, 서로에게 서운한 기억도 많았지\n" +
        "하지만 그 과정이 있었기에 그만큼 우리가 더 서로를 깊이 이해할 수 있었고, 그만큼 더 사랑하게 된 것 같아.\n" +
        "너랑 함께하는 시간이 너무 행복하고 즐거워서 1년이라는 시간이 가는줄도 몰랐어\n\n" +
        "보고싶은거 기다리느라 힘들었지. 내가 만드는거 궁금한데 참고 기다려줘서 고마워!\n\n" +
        "나랑 앞으로 2주년,3주년, 100주년까지 같이 있어줘 😍\n" +
        "1주년 축하해! 앞으로도 우리 평생 함께하자! 사랑해❤",
    })
  }
/>

      {isLightOn && (
        <Text
          position={[0, 1.55, -1.25]}
          fontSize={0.36}
          color="#fff3a6"
          anchorX="center"
        >
          Happy 1st Anniversary!
        </Text>
      )}

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

/* -----------------------------
  최상위 Scene3D
----------------------------- */
function Scene3D({ onSelectMemory }) {
  const isMobile = window.innerWidth <= 768;

  const [isLightOn, setIsLightOn] = useState(false);
  const [fireworkKey, setFireworkKey] = useState(0);
  const [showPartyPopper, setShowPartyPopper] = useState(false);
  const partyTimerRef = useRef(null);

  const handleToggleLight = () => {
  setIsLightOn((prev) => {
    const next = !prev;

    // 기존 타이머 정리
    if (partyTimerRef.current) {
      clearTimeout(partyTimerRef.current);
      partyTimerRef.current = null;
    }

    if (next) {
      // LIGHT ON 순간에만 폭죽 시작
      setFireworkKey((key) => key + 1);
      setShowPartyPopper(true);

      // 종이 파티클이 사라질 타이밍에 고깔도 함께 제거
      partyTimerRef.current = setTimeout(() => {
        setShowPartyPopper(false);
        partyTimerRef.current = null;
      }, 2000);
    } else {
      // LIGHT OFF 시 폭죽 즉시 제거
      setShowPartyPopper(false);
    }

    return next;
  });
};

useEffect(() => {
  return () => {
    if (partyTimerRef.current) {
      clearTimeout(partyTimerRef.current);
    }
  };
}, []);

  return (
    <section className={`scene-wrapper ${isLightOn ? "light-on" : "light-off"}`}>
      <Canvas
        shadows
        camera={{
          position: isMobile ? [0, 3.1, 6.5] : [0, 2.6, 5.2],
          fov: isMobile ? 54 : 45,
        }}
      >
        <SceneContent
          onSelectMemory={onSelectMemory}
          isLightOn={isLightOn}
          fireworkKey={fireworkKey}
          showPartyPopper={showPartyPopper}
        />
      </Canvas>

      <button
        className={`room-switch ${isLightOn ? "on" : "off"}`}
        onClick={handleToggleLight}
        aria-label={isLightOn ? "Turn off the room light" : "Turn on the room light"}
      >
        <span className="switch-label">
          {isLightOn ? "LIGHT ON" : "LIGHT OFF"}
        </span>

        <span className="switch-track">
          <span className="switch-thumb" />
        </span>
      </button>
    </section>
  );
}

export default Scene3D;
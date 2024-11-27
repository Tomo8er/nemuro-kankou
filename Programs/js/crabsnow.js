document.addEventListener("DOMContentLoaded", () => {
  (function() {
    var d = document, h = d.body, s = 100, v = "❄️", i = 0, f;

    var m = function() {
      var n = d.createElement("div");
      n.style.position = "fixed";
      n.style.left = Math.random() * 100 + "vw";
      n.style.top = "-10px";
      n.style.fontSize = (Math.random() * 15 + 10) + "px";
      n.style.color = "#fff";
      n.style.zIndex = "9999";
      n.textContent = v;
      n.style.pointerEvents = "none";
      n.style.userSelect = "none";
      n.style.animation = "fall " + (Math.random() * 5 + 5) + "s linear infinite";
      h.appendChild(n);
      setTimeout(function() { n.remove(); }, (Math.random() * 5000 + 5000));
    };

    var g = function() {
      if (i++ < s) f = setTimeout(function() { m(); g(); }, 200);
    };

    var style = d.createElement("style");
    style.innerHTML = `
      @keyframes fall {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `;
    d.head.appendChild(style);

    var html = d.documentElement;
    html.style.height = "100%";
    h.style.height = "100%";

    var startSnowing = function() {
      g();
      document.getElementById('snowButton').style.display = 'none';
    };

    document.getElementById('snowButton').addEventListener('click', startSnowing);
  })();


  const gameArea = document.getElementById("gameArea");
  const kaniButton = document.getElementById("kaniButton");

  let score = 0;
  let isGameRunning = false;

  const scoreDisplay = document.createElement("div");
  Object.assign(scoreDisplay.style, {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    zIndex: 9999,
  });
  scoreDisplay.textContent = "スコア: 0";
  gameArea.appendChild(scoreDisplay);

  gameArea.style.display = "none";

  kaniButton.addEventListener("click", () => {
    if (!isGameRunning) {
      startGame();
    }
  });

  function startGame() {
    isGameRunning = true;
    score = 0;
    scoreDisplay.textContent = "スコア: 0";
    gameArea.style.display = "block";
    
    Object.assign(gameArea.style, {
      position: "relative",
      background: "linear-gradient(to bottom, #87ceeb, #f0e68c)",
      overflow: "hidden",
      zIndex: 1,
    });

    const net = document.createElement("div");
    Object.assign(net.style, {
      position: "absolute",
      width: "80px",
      height: "80px",
      fontSize: "40px",
      textAlign: "center",
      lineHeight: "80px",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: "50%",
      color: "#fff",
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      pointerEvents: "none",
    });
    net.textContent = "🕸️";
    gameArea.appendChild(net);

    let isTouching = false;

    window.addEventListener("mousemove", (e) => {
      if (!isTouching) {
        updateNetPosition(e.clientX);
      }
    });

    window.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      updateNetPosition(touch.clientX);
    });

    window.addEventListener("touchstart", (e) => {
      isTouching = true;
      const touch = e.touches[0];
      updateNetPosition(touch.clientX);
    });

    window.addEventListener("touchend", () => {
      isTouching = false;
    });

    function updateNetPosition(x) {
      const netWidth = net.offsetWidth;
      const screenWidth = window.innerWidth;
      let newLeft = x - netWidth / 2;

      newLeft = Math.max(0, Math.min(newLeft, screenWidth - netWidth));
      net.style.left = `${newLeft}px`;
    }

    function spawnKani() {
      if (!isGameRunning) return;

      const kani = document.createElement("div");
      Object.assign(kani.style, {
        position: "absolute",
        fontSize: "30px",
        color: "red",
        left: `${Math.random() * window.innerWidth}px`,
        top: "-50px",
      });
      kani.textContent = "🦀";
      gameArea.appendChild(kani);

      const fallInterval = setInterval(() => {
        const kaniTop = parseFloat(kani.style.top);
        if (kaniTop > window.innerHeight) {
          clearInterval(fallInterval);
          gameArea.removeChild(kani);
        } else {
          kani.style.top = `${kaniTop + 5}px`;
        }

        const kaniRect = kani.getBoundingClientRect();
        const netRect = net.getBoundingClientRect();

        if (
          kaniRect.left < netRect.right &&
          kaniRect.right > netRect.left &&
          kaniRect.top < netRect.bottom &&
          kaniRect.bottom > netRect.top
        ) {
          clearInterval(fallInterval);
          gameArea.removeChild(kani);
          score++;
          scoreDisplay.textContent = `スコア: ${score}`;
        }
      }, 30);
    }

    setInterval(spawnKani, 1000);

    function endGame() {
      isGameRunning = false;
      gameArea.style.display = "none";
      alert(`ゲーム終了！最終スコア: ${score}`);
    }

    setTimeout(endGame, 30000);
  }
});
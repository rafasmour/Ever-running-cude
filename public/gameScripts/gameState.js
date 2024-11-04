    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const finalScoreElement = document.getElementById('finalScore');

    // Game variables
    let player = {
      x: 50,
      y: 0,
      width: 0,
      height: 0,
      dy: 0,
      isJumping: false,
      isDoubleJumping: false,
      isSliding: false,
    };
    let bullets = [];
    let obstacles = [];
    let score = 0;
    let lastSpawnTime = 0;
    const maxObstacles = 5;
    let gravity;
    let jumpVelocity;
    let obstacleSpeed;
    
    let obstacleSpawnInterval;
    let bulletCooldown = 500;
    let lastBulletTime = 0;
    let gameInterval;
    let gameRunning = false;
    let height;
    let width;
    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#F1F9FF'); // Light blue at the top
      gradient.addColorStop(1, '#A7D3E0'); // Darker blue at the bottom

      ctx.fillStyle = gradient; // Set the gradient as the fill style
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas
    }
    function resizeCanvas() {
      const aspectRatio = 800 / 400;
      const newWidth = window.innerWidth < 800 ? window.innerWidth : 800;
      const newHeight = newWidth / aspectRatio;
      canvas.width = newWidth;
      canvas.height = newHeight;
      height = newHeight * 0.125;
      player.width = newWidth * 0.0625;
      player.height = height;
      player.y = newHeight - height;
      gravity = newHeight * 0.0025;
      jumpVelocity = -newHeight * 0.045;
    }

    function startGame() {
      score = 0;
      player.dy = 0;
      player.isJumping = false;
      player.isDoubleJumping = false;
      obstacles = [];
      obstacleSpawnInterval = 1500;
      obstacleSpeed = canvas.width * 0.01;
      bullets = [];
      lastSpawnTime = Date.now();
      gameRunning = true;
      gameOverMessage.style.display = 'none';
      gameInterval = requestAnimationFrame(updateGame);
    }

    function updateSpawnInterval() {
      if (score > 10 && score <= 20) {
        obstacleSpawnInterval = 1000;
        obstacleSpeed = canvas.width * 0.015;
      } else if (score > 20) {
        obstacleSpawnInterval = 500;
        obstacleSpeed = canvas.width * 0.02;
      }
    }

    function updateGame() {
      drawBackground(); // Draw the gradient background
      // Update player
      if (player.isJumping || player.isDoubleJumping) {
        player.dy += gravity;
        player.y += player.dy;

        if (player.y >= canvas.height - player.height) {
          player.isJumping = false;
          player.isDoubleJumping = false;
          player.dy = 0;
          player.y = canvas.height - player.height;
        }
      }
      ctx.fillStyle = '#FF6B6B'; // Coral Red
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Update bullets
      bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.x > canvas.width) {
          bullets.splice(index, 1);
        }
      });

      // Update spawn interval based on score
      updateSpawnInterval();

      // Check if it's time to spawn a new obstacle
      const currentTime = Date.now();
      if (currentTime - lastSpawnTime > obstacleSpawnInterval && obstacles.length < maxObstacles) {
        const obstacleType = Math.random();
        let yPosition, obstacleWidth, obstacleHeight;

        if (obstacleType < 0.33) {
          // Ground obstacle
          yPosition = canvas.height - height;
          obstacleWidth = player.width;
          obstacleHeight = height;
        } else if (obstacleType < 0.66) {
          // Floating obstacle
          yPosition = canvas.height*0.4  + (canvas.height*0.01*(Math.random()*10));
          console.log(yPosition);
          obstacleWidth = player.width;
          obstacleHeight = height;
        } else {
          // Pillar obstacle
          obstacleWidth = player.width; // Set pillar width
          obstacleHeight = canvas.height; // Random height for the pillar
          yPosition = -height/2 ; // Position it at the ground level
        }

        obstacles.push({
          x: canvas.width,
          y: yPosition,
          width: obstacleWidth,
          height: obstacleHeight,
          type: obstacleType < 0.33 ? 'ground' : (obstacleType < 0.66 ? 'floating' : 'pillar'),
          floatOffset: Math.random() * 100 // Added for floating movement
        });
        lastSpawnTime = currentTime;
      }

      // Move and draw obstacles
      let obstaclesToRemove = [];
      obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacleSpeed; // Move the obstacle to the left

        // Apply floating movement for floating obstacles
        if (obstacle.type === 'floating') {
          obstacle.floatOffset += 0.05; // Increment float offset
          obstacle.y = (Math.sin(obstacle.floatOffset)) + (obstacle.y); // Floating effect
          
        }

        ctx.fillStyle = obstacle.type === 'ground' ? '#FFC300' : (obstacle.type === 'floating' ? '#6BFF6B' : 'purple');
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Collision detection between bullet and obstacle
        bullets.forEach((bullet, bulletIndex) => {
          if (
            bullet.x < obstacle.x + obstacle.width &&
            bullet.x + bullet.width > obstacle.x &&
            bullet.y < obstacle.y + obstacle.height &&
            bullet.y + bullet.height > obstacle.y
          ) {
            if(obstacle.type == 'floating'){
              obstaclesToRemove.push(index);
              score+=2;
            }
            bullets.splice(bulletIndex, 1);
          }
          
          
        });

        // Collision detection between player and obstacle
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        ) {
          endGame();
          return;
        }

        // Mark off-screen obstacles for removal
        if (obstacle.x + obstacle.width < 0) {
          obstaclesToRemove.push(index);
          score++;
        }
      });

      // Remove marked obstacles
      for (let index of obstaclesToRemove.reverse()) {
        obstacles.splice(index, 1);
      }

      // Display score
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);
      // Continue the game loop if the game is running
      if (gameRunning) {
        gameInterval = requestAnimationFrame(updateGame);
      }
    }

    function endGame() {
      gameRunning = false;
      finalScoreElement.textContent = score;
      gameOverMessage.style.display = 'block';
      cancelAnimationFrame(gameInterval);
    }

    function resetGame() {
      startGame();
    }

    // Player controls
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' && gameRunning) {
        if (!player.isJumping) {
          player.isJumping = true;
          player.dy = jumpVelocity;
        } else if (player.isJumping && !player.isDoubleJumping) {
          player.isDoubleJumping = true;
          player.dy = jumpVelocity;
        }
      }

      if (e.key === 'a' && gameRunning) {
        const currentTime = Date.now();
        if (currentTime - lastBulletTime > bulletCooldown) {
          bullets.push({ x: player.x + player.width, y: player.y + player.height, width: player.width, height: player.width, speed: obstacleSpeed });
          lastBulletTime = currentTime;
        }
      }
      if (e.key === 's' && gameRunning) {
        if(!player.isSliding){
          player.isSliding = true;
          player.height/=2;
          player.dy = 10  ;
          player.y+=player.height;
        }
          
      }
      if (e.key === 'r' && !gameRunning) {
        resetGame();
      }
      
    });
    document.addEventListener('keyup', (e) => {
      if(player.isSliding){
          player.isSliding = false;
          player.height*=2;
          player.y = canvas.height - player.height;

        }
    })
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    startGame();
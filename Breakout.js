function play()
			{
			document.getElementById("startButton").innerHTML = "";
			


			//global variables
			var canvas = document.getElementById("myCanvas");
			var ctx = canvas.getContext("2d");
			var x = canvas.width/2;
			var y = canvas.height - 30;
			var dx = 2;
			var dy= -2;
			var ballRadius = 10;
			var score = 0;
			var lives = 3;



			//paddle details
			var paddleHeight = 10;
			var paddleWidth = 75;
			var paddleX = (canvas.width - paddleWidth)/2;
			var paddleY = (canvas.height - paddleHeight);
			


			//keypress booleans
			var rightPressed = false;
			var leftPressed = false;



			//bricks variables
			var brickRowCount = 3;
			var brickColumnCount = 10;
			var brickWidth = 35;
			var brickHeight = 20;
			var brickPadding = 10;
			var brickOffsetTop = 30;
			var brickOffsetLeft = 30;



			//bricks initialization
			var bricks = [];			//2d array to store bricks
			for(c=0; c<brickColumnCount; c++)
			{
			    bricks[c] = [];
			    for(r=0; r<brickRowCount; r++)
			    {
			        bricks[c][r] = { x: 0, y: 0, status: 1 };
			    }
			}


			
			//Event Listeners
			document.addEventListener("keydown", keyDownHandler,false);
			document.addEventListener("keyup", keyUpHandler, false);
			document.addEventListener("mousemove", mouseMoveHandler, false);




			//Event Handlers
			function keyDownHandler(e)
			{
				if(e.keyCode == 39)
					rightPressed = true;
				else if(e.keyCode == 37)
					leftPressed = true;
			}

			function keyUpHandler(e)
			{
				if(e.keyCode == 39)
					rightPressed = false;
				else if(e.keyCode == 37)
					leftPressed = false;
			}

			function mouseMoveHandler(e)
			{
				var relativeX = e.clientX - canvas.offsetLeft;
				if(relativeX>=0&&relativeX<=canvas.width)
				{
					paddleX = relativeX - paddleWidth/2;
				}
			}




			//Drawing objects functions
			function drawBall()
			{
				ctx.beginPath();
				ctx.arc(x, y, ballRadius, 0, Math.PI*2);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}

			function drawPaddle()
			{
				ctx.beginPath();
				ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}

			function drawBricks()
			{
				for(c=0; c<brickColumnCount; c++)
				{
					for(r=0; r<brickRowCount; r++)
					{
						if(bricks[c][r].status==1)
						{
							var brickX = brickOffsetLeft + c*(brickPadding + brickWidth);
							var brickY = brickOffsetTop + r*(brickPadding + brickHeight);
							bricks[c][r].x = brickX;
							bricks[c][r].y = brickY;
							ctx.beginPath();
							ctx.rect(brickX, brickY, brickWidth, brickHeight);
							ctx.fillStyle = "#0095DD";
							ctx.fill();
							ctx.closePath();
						}
					}
				}
			}

			function drawScore()
			{
				ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.fillText("Score: "+score, 8, 20);
			}

			function drawLives()
			{
				ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.fillText("Lives: "+lives, canvas.width-65, 20);
			}





			//Collision Detection
			function collisionDetection()
			{
				for(c=0; c<brickColumnCount; c++)
				{
					for(r=0; r<brickRowCount; r++)
					{
						var b = bricks[c][r];
						if(b.status==1)
						{
							if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight)
							{
								dy = -dy;
								b.status = 0;
								score++;
								if(score==brickRowCount*brickColumnCount)
								{
									alert("You win!");
									document.location.reload();
								}
							}
						}
					}
				}
			}





			//main repetitive draw function
			function draw()
			{
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawBricks();
				drawBall();
				drawPaddle();
				collisionDetection();
				drawScore();
				drawLives();
				if(y+dy<=ballRadius)
				{
					dy = -dy;
				}
				else if(y+dy>=canvas.height-ballRadius)
				{
					if(x>=paddleX&&x<=paddleX+paddleWidth){
						dy = -dy;
					}
					else
					{
						lives--;
						if(!lives)
						{
							alert("Game Over! Your score: "+score);
							document.location.reload();
						}
						else
						{
							x = canvas.width/2;
							y = canvas.height - paddleHeight - ballRadius;
							dx = 2;
							dy = -2;
							paddleX = (canvas.width - paddleWidth)/2;
						}
					}
				}
				if(x+dx>=canvas.width-ballRadius||x+dx<=ballRadius)
				{
					dx = -dx;
				}
				x += dx;
				y += dy;				
				if(rightPressed&&paddleX<canvas.width-paddleWidth)
					paddleX += 7;
				else if(leftPressed&&paddleX>0)
					paddleX -= 7;
				//requestAnimationFrame(draw);
			}



			setInterval(draw,10);
			//draw();
			}
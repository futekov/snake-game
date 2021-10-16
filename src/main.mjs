import GameArea from './game-area.mjs';
import GameObject from './game-object.mjs';
import Snake from './snake.mjs';

function main() {
  const gameAreaInstance = new GameArea();
  
  let snakeInstance = new Snake(gameAreaInstance);
  
  const wallTop = new GameObject(gameAreaInstance, 5, 5, 1910, 5);
  const wallRight = new GameObject(gameAreaInstance, 1910, 5, 5, 1070);
  const wallBottom = new GameObject(gameAreaInstance, 5, 1070, 1910, 5);
  const wallLeft = new GameObject(gameAreaInstance, 5, 5, 5, 1070);

  gameAreaInstance.obstacles.push(wallTop);
  gameAreaInstance.obstacles.push(wallRight);
  gameAreaInstance.obstacles.push(wallBottom);
  gameAreaInstance.obstacles.push(wallLeft);

  gameAreaInstance.snake = snakeInstance;

  gameAreaInstance.start();
}

window.addEventListener('DOMContentLoaded', main);

import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-snake',
  standalone: true,
  imports: [NgClass],
  templateUrl: './game-snake.component.html',
  styleUrl: './game-snake.component.css'
})
export class GameSnakeComponent {

  boardSize: number = 20;
  snake: IPoint[] = [{x: Math.floor(this.boardSize / 2), y: Math.floor(this.boardSize / 2)}];
  direction: Direction = Direction.Right;
  food: IPoint = this.randomFoodPosition();
  score: number = 0;
  gameSpeed: number = 200;
  gameInterval?: Subscription;
  
  ngOnInit() {
    this.startGame();
  }
  
  startGame() {
    this.boardSize = this.boardSize;
    this.snake = this.snake;
    this.direction = this.direction;
    this.food = this.randomFoodPosition();
    this.score = this.score;
    this.gameSpeed = this.gameSpeed;
    this.gameInterval = interval(this.gameSpeed).subscribe(() => this.updateGame());
  }

  updateGame() {    
    let head = {...this.snake[0]};
      
    switch(this.direction) {
      case Direction.Up:
        head.y--;
        break;
      case Direction.Right:
        head.x++;
        break;
      case Direction.Down:
        head.y++;
        break;
      case Direction.Left:
        head.x--;
        break;
    }

    if(this.isCollision(head)) {
      this.endGame();
      return;
    }

    this.snake.unshift(head);

    if(head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.gameSpeed--;
      this.randomFoodPosition();
    }
    else {
      this.snake.pop();
    }
  }

  isCollision(head: IPoint) {
    if(head.x < 0 || head.x >= this.boardSize || head.y < 0 || head.y >= this.boardSize) {
      return true;
    }
    
    // for(let part of this.snake) {
    //   if(this.snake.length > 0 && head.x === part.x || head.y === part.y) {
    //     return true;
    //   }
    // }

    return false;
  }
  
  randomFoodPosition(): IPoint {
    let position: IPoint;
    do {
      position = {
        x: Math.floor(Math.random() * this.boardSize),
        y: Math.floor(Math.random() * this.boardSize)
      };
    } while(this.isSnake(position.x, position.y));
    return position;
  }

  endGame() {
    this.gameInterval?.unsubscribe();
  }

  isSnake(x: number, y: number) {
    return this.snake.some(part => part.x === x && part.y === y);
  }
  
  isFood(x: number, y: number) {
    return this.food.x === x && this.food.y === y;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {    
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== Direction.Down) this.direction = Direction.Up;
        break;
      case 'ArrowRight':
        if (this.direction !== Direction.Left) this.direction = Direction.Right;
        break;
      case 'ArrowDown':
        if (this.direction !== Direction.Up) this.direction = Direction.Down;
        break;
      case 'ArrowLeft':
        if (this.direction !== Direction.Right) this.direction = Direction.Left;
        break;
    }
  }
}

export interface IPoint {
  x: number;
  y: number;
}

export enum Direction {
  Up = 1,
  Right = 2,
  Down = 3,
  Left = 4
}
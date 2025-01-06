import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Direction, GameSnakeComponent } from './game-snake.component';

describe('GameSnakeComponent', () => {
  let component: GameSnakeComponent;
  let fixture: ComponentFixture<GameSnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSnakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the game correctly', () => {
    component.startGame();
    expect(component.snake.length).toBe(1);
    expect(component.snake[0].x).toBe(10);
    expect(component.snake[0].y).toBe(10);
    expect(component.food).toBeDefined();
    expect(component.score).toBe(0);
  });

  it('should move the snake correctly', () => {
    component.startGame();
    component.updateGame();
    expect(component.snake[0].x).toBe(11);
    expect(component.snake[0].y).toBe(10);
  });

  it('should detect collisions correctly', () => {
    component.startGame();
    component.snake = [{ x: 0, y: 0 }];
    component.direction = Direction.Left;
    component.updateGame();
    expect(component.isCollision(component.snake[0])).toBe(true);
  });

  it('should place food correctly', () => {
    component.startGame();
    const food = component.randomFoodPosition();
    expect(food).toBeDefined();
    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThan(component.boardSize);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeLessThan(component.boardSize);
  });

  // it('should end game on collision', () => {
  //   spyOn(window, 'alert');
  //   component.startGame();
  //   component.snake = [{ x: 0, y: 0 }];
  //   component.direction = Direction.Left;
  //   component.updateGame();
  //   expect(window.alert).toHaveBeenCalledWith('Game Over! Your score is 0');
  // });

  it('should increase score on eating food', () => {
    component.startGame();
    component.food = { x: 11, y: 10 };
    component.updateGame();
    expect(component.score).toBe(1);
  });

  [
    {key: 'ArrowUp', expected: Direction.Up},
    {key: 'ArrowRight', expected: Direction.Right},
    {key: 'ArrowDown', expected: Direction.Down},
    {key: 'ArrowLeft', expected: Direction.Left}
  ].forEach((testdata) => {
    it('should change direction correctly', () => {
      component.startGame();
      const event = new KeyboardEvent('keydown', { key: testdata.key });
      component.handleKeydown(event);
      expect(component.direction).toBe(testdata.expected);
    });
  })

  it('should not allow reverse direction', () => {
    component.startGame();
    component.direction = Direction.Left;
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.handleKeydown(event);
    expect(component.direction).toBe(Direction.Left);
  });
});

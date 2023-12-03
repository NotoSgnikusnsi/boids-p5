class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D(); // 大きさが1のランダムなベクトル
    this.acceleration = createVector(0, 0);
  }

  // 結合
  cohesion(boids) { }
  // 分離
  separation(boids) { }
  // 整列
  alignment(boids) { }


}

function setup() {
}

function draw() {
}

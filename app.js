class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D(); // 大きさが1のランダムなベクトル
    this.acceleration = createVector(0, 0);
  }

  // 結合
  cohesion(boids) {
    // 1. 結合したい仲間の距離を決める
    const radius = 100;
    const sum = createVector(0, 0);
    const count = 0;
    // 2. 仲間の合計距離を計算する
    for (let boid of boids) {
      const distance = this.position.dist(boid.position);
      if (distance < radius) {
        sum.add(boid.position);
        count++;
      }
    }
    // 3. 仲間の平均位置に向かうベクトルを計算する
    sum.div(count);
    sum.sub(this.position);
    sum.setMag(0.1);
    // 4. 速度を更新する
    this.acceleration.add(sum);
  }

  // 分離
  separation(boids) {
    // 1. 分離したい仲間の距離を決める
    const radius = 50;
    const sum = createVector(0, 0);
    const count = 0;
    // 2. 仲間の合計距離を計算する
    for (let boid of boids) {
      const distance = this.position.dist(boid.position);
      if (distance < radius) {
        sum.add(boid.position);
        count++;
      }
    }
    // 3. 仲間から離れるベクトルを計算する
    sum.div(count);
    sum.sub(this.position);
    sum.setMag(0.1);
    // 4. 速度を更新する
    this.acceleration.sub(sum);
  }

  // 整列
  alignment(boids) { }


}

function setup() {
}

function draw() {
}

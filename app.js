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
    let count = 0;
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
    let count = 0;
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
  alignment(boids) {
    // 1. 整列したい仲間の距離を決める
    const radius = 100;
    const sum = createVector(0, 0);
    let count = 0;
    // 2. 仲間の合計速度を計算する
    for (let boid of boids) {
      const distance = this.position.dist(boid.position);
      if (distance < radius) {
        sum.add(boid.velocity);
        count++;
      }
    }
    // 3. 仲間の平均速度に向かうベクトルを計算する
    sum.div(count);
    sum.setMag(0.1);
    // 4. 速度を更新する
    this.acceleration.add(sum);
  }

  // フレームごとの処理
  // フレームごとの処理
  update() {
    // 速度を更新する
    this.velocity.add(this.acceleration);
    // 速度の大きさを2にする
    this.velocity.limit(2);
    // 位置を更新する
    this.position.add(this.velocity);
    // 加速度をリセットする
    this.acceleration.mult(0);

    // 画面の外に出た場合、反対側から再度入ってくる
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  display() {
    // 位置に円を描く
    stroke(0);
    fill(0, 100);
    ellipse(this.position.x, this.position.y, 16, 16);
  }

}

const boids = [];
const boidsCount = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < boidsCount; i++) {
    boids.push(new Boid());
  }
}

function draw() {
  background(255);
  for (let boid of boids) {
    boid.cohesion(boids);
    boid.separation(boids);
    boid.alignment(boids);
    boid.update();
    boid.display();
  }
}

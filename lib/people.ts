export default class People {
  private name: string;
  isTalking: boolean;

  constructor() {
    this.name = crypto.randomUUID();
    this.isTalking = Math.random() < 0.5;
  }

  process(volume: number): boolean {
    this.isTalking = Math.random() < 0.5;
    if (volume < 10) {
      this.isTalking = false;
    }
    return this.isTalking;
  }
}

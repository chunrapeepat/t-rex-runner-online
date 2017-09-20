module.exports = class {

  constructor() {
    this.connection = {}
    this.x = {}
  }

  newConnection(id, username) {
    this.connection[id] = {
      id, username, max_score: 0
    }
  }

  setHighScore(id, score) {
    this.connection[id]['max_score'] = score
  }

  setxPosition(id, xPos) {
    if(this.x[id] === undefined) this.x[id] = 0
    this.x[id] = xPos
  }

  removexPosition(user_id) {
    if(this.x[user_id] != undefined) {
      delete this.x[user_id]
    }
  }

  get getxPosition() {
    return this.x
  }

}

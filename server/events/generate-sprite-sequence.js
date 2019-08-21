function* generateSpriteSequence(i = 0, sprites = ["ogre", "behemoth", "lizzard", "frog", "llama"]) {
  while (true) {
    yield sprites[i];
    i < sprites.length - 1 ? i++ : i = 0;
  }
}

module.exports = generateSpriteSequence;

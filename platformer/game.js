var streetScene = {
    key: 'streetScene',
    preload: preloadStreetScene,
    create: createStreetScene,
    update: update
};

var indoorsScene = {
    key: 'indoorsScene',
    create: createIndoorsScene,
    update: update
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: [ streetScene, indoorsScene ]
};

var game = new Phaser.Game(config);

function preloadStreetScene () {
    this.load.image('ground', 'ground.png');
    this.load.image('background', 'background.png');
    this.load.image('windowsill', 'windowsill.png');
    this.load.spritesheet('cat', 
        'catsprite.png',
        { frameWidth: 64, frameHeight: 64 }
    );
}

function initCreate(self) {
    self.anims.create({
        key: 'left',
        frames: self.anims.generateFrameNumbers('cat', { start: 12, end: 14 }),
        frameRate: 10,
        repeat: -1
    });

    self.anims.create({
        key: 'turn',
        frames: [ { key: 'cat', frame: 55 } ],
        frameRate: 0
    });

    self.anims.create({
        key: 'right',
        frames: self.anims.generateFrameNumbers('cat', { start: 24, end: 26 }),
        frameRate: 10,
        repeat: -1
    });

    self.anims.create({
        key: 'sitting',
        frames: self.anims.generateFrameNumbers('cat', { start: 54, end: 56}),
        frameRate: 1,
        repeat: -1
    });

    cursors = self.input.keyboard.createCursorKeys();
}

function createPlayer(x, y, sprite, self) {
    player = self.physics.add.sprite(x, y, sprite);
    player.body.setGravityY(100);
    player.body.setSize(24, 64, 16, 0);
    player.setCollideWorldBounds(true);
}

function createStreetScene() {
    initCreate(this);
    this.add.image(400, 300, 'background');

    ground = this.physics.add.staticSprite(400, 485, 'ground');
    sill = this.physics.add.staticSprite(355, 355, 'windowsill');
    createPlayer(355, 320, 'cat', this);

    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, sill, onPlatform.bind(this));

}

function createIndoorsScene() {
    sill = this.physics.add.staticSprite(355, 355, 'windowsill');
    
    createPlayer(355, 320, 'cat', this);

    this.physics.add.collider(player, sill, onPlatform.bind(this));
}

function update() {
    handleMovement();
}

function handleMovement() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    if (cursors.down.isDown && player.body.touching.down) {
        player.anims.play('sitting', true);
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
        player.setVelocityX(0);

        if (!cursors.up.isDown && !cursors.down.isDown) {
            player.anims.stop();
        }
    }
}

function onPlatform() {
    if (cursors.space.isDown) {
        this.scene.switch('indoorsScene');
    }
}

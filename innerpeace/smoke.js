
//========= PARTICLE SYSTEM ===========

/**
 * A basic particle system class
 * @param num the number of particles
 * @param v the origin of the particle system
 * @param img_ a texture for each particle in the system
 * @constructor
 */
var ParticleSystem = function(num,v) {

    this.particles = [];
    this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident
    for(var i = 0; i < num; ++i){
        this.particles.push(new Particle(this.origin));
    }
};

/**
 * This function runs the entire particle system.
 */
ParticleSystem.prototype.run = function() {

    // cache length of the array we're going to loop into a variable
    // You may see <variable>.length in a for loop, from time to time but
    // we cache it here because otherwise the length is re-calculated for each iteration of a loop
    var len = this.particles.length;

    //loop through and run particles
    for (var i = len - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.run();

        // if the particle is dead, we remove it.
        // javascript arrays don't have a "remove" function but "splice" works just as well.
        // we feed it an index to start at, then how many numbers from that point to remove.
        if (particle.isDead()) {
            this.particles.splice(i,1);
        }
    }
}

/**
 * Method to add a force vector to all particles currently in the system
 * @param dir a p5.Vector describing the direction of the force.
 */
ParticleSystem.prototype.applyForce = function(dir) {
    var len = this.particles.length;
    for(var i = 0; i < len; ++i){
        this.particles[i].applyForce(dir);
    }
}


ParticleSystem.prototype.reLocate = function(v) {
    this.origin=v.copy();
}
/**
 * Adds a new particle to the system at the origin of the system and with
 * the originally set texture.
 */
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin,this.img));
}

//========= PARTICLE  ===========
/**
 *  A simple Particle class, renders the particle as an image
 */
var Particle = function (pos) {
    this.loc = pos.copy();

    var vx = randomGaussian() * 0.3;
    var vy = randomGaussian() * 0.3;

    this.vel = createVector(vx,vy);
    this.acc = createVector();
    this.lifespan = 100.0;
}

/**
 *  Simulataneously updates and displays a particle.
 */
Particle.prototype.run = function() {
    this.update();
    this.render();
}

/**
 *  A function to display a particle
 */
Particle.prototype.render = function() {
    noStroke();
    fill(col,180,0,this.lifespan);
    var smokeRadius = smokeR*map(this.lifespan,0,100,0.5,1);
    ellipse(this.loc.x,this.loc.y,smokeRadius,smokeRadius);
}

/**
 *  A method to apply a force vector to a particle.
 */
Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

/**
 *  This method checks to see if the particle has reached the end of it's lifespan,
 *  if it has, return true, otherwise return false.
 */
Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}

/**
 *  This method updates the position of the particle.
 */
Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0);
}
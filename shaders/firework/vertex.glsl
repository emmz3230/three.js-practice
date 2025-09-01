uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aTimeMultiplier;
attribute float aSize;

#include ../includes/remap.glsl

void main() {
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // exploding
    float explodingProgress = remap(progress,0.0,0.1,0.0,1.0);
    explodingProgress = clamp(explodingProgress, 0.0,1.0);
    explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0);
    newPosition *= explodingProgress;

    // falling
    float fallingProgresss = remap(progress, 0.1,1.0,0.0,1.0);
    fallingProgresss = clamp(fallingProgresss, 0.0,1.0);
    fallingProgresss = 1.0 - pow(1.0 - fallingProgresss, 3.0);
    newPosition.y -= fallingProgresss * 0.2;

    // scaling
    float sizeOpeningProgress = remap(progress,0.0,0.125,0.0,1.0);
    float sizeClosingProgress = remap(progress,0.125, 1.0,1.0,0.0);
    float sizeProgress = min(sizeOpeningProgress,sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0,1.0);

    // twinkling
    float twinklingProgress = remap(progress, 0.2,0.8,0.0,1.0);
    twinklingProgress = clamp(twinklingProgress,0.0,1.0);
    float sizeTwinkling = sin(progress * 30.0) * 0.5 + 0.5;
    sizeTwinkling = sizeTwinkling * twinklingProgress;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // final size
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.0 / - viewPosition.z;

    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}
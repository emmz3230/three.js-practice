uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;

uniform float uWrapPositionFrequency;
uniform float uWrapTimeFrequency;
uniform float uWrapStrength;

attribute vec4 tangent;

varying float vWobble;

#include ../includes/simplexNoise4d.glsl

float getWobble( vec3 position){
    vec3 warpPosition  = position;
    warpPosition += simplexNoise4d(
        vec4(
        position * uWrapPositionFrequency,
        uTime * uWrapTimeFrequency
    )) * uWrapStrength;

    return simplexNoise4d(vec4(
        position * uPositionFrequency, 
        uTime * uTimeFrequency
    )) * uStrength;
}


void main()
{
    vec3 biTangent = cross(normal, tangent.xyz);

    // neighbours positions
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz + shift;
    vec3 positionB = csm_Position + biTangent + shift;


    //    wooble
    float wooble = getWobble(csm_Position);
    csm_position += wooble * normal;
    positionA += getWobble(positionA) + normal;
    positionB += getWobble(positionB) + normal;

    vec3 toA = normalize(PositionA - csm_Position);
    vec3 toB = normalize(PositionB - csm_Position);
    csm_Normal = cross(toA,toB);

    vWobble = wooble / uStrength;
}
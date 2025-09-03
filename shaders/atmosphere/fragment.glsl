uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;



varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// #include ../includes/ambientLight.glsl
// #include ../includes/directionalLight.glsl


void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // sun orientation
    vec3 uSunDirection = vec3(0.0,0.0,1.0);
    float sunOrientation = dot(uSunDirection,normal);
    color += atmosphereColor;

      // atmosphere
    float atmosphereDayMix = smoothstep(-0.5,1.0,sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor,uAtmosphereDayColor,atmosphereDayMix);
    color = mix(color,atmosphereColor);

     // alpha
    float edgeAlpha = dot(viewdirection,normal);
    edgeAlpha = smoothstep(0.00,0.5,edgeAlpha);
    // color = vec3(edgeAlpha);

    float dayAlpha = smoothstep(-0.5,0.0,sunOrientation)
    // color = vec3(dayAlpha);

    float alpha = edgeAlpha * dayAlpha;
    
    // Final color
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
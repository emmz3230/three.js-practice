uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include  ../includes/ambientLight.glsl
#include  ../includes/directionalLight.glsl
#include  ../includes/pointLight.glsl



void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = vPosition - cameraPosition;

    vec3 color = uColor;

    // light
    vec3 light = vec3(0.0);
    light += ambientLight(vec3(1.0), 0.03);
    light += directionalLight(      
        vec3(0.1,0.1,1.0),  //light color
        1.0,                //light intensity
        vNormal,            //normal
        vec3(0.0,0.0,3.0),  //light position
        viewDirection,      //view direction
        2.0                 //specular power
   );
   light += pointLight(      
        vec3(1.0,0.1,0.1),  //light color   
        1.0,                //light intensity
        normal,             //normal
        vec3(0.0,2.5,0.0),  //light position
        viewDirection,      //view direction
        20.0,               //specular power
        vPosition,           // position
        0.25                //light decay
   );

    color *= light;

    // final color
    gl_FragColor = vec4(vPosition,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
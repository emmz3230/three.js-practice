uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
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
    color = vec3(sunOrientation);

    // day /night
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture,vUv).rgb;
    vec3 nightColor = texture(uNightTexture,vUv).rgb;
    color = mix(nightColor,dayColor,dayMix);

    // specualr clouds color
    vec2 specularCloudsColor = texture(uSpecularCloudsTexture,vUv).rg;
    // color = vec3(specularCloudsColor,0.0);

    // clouds
    float cloudsMix = smoothstep(0.5,1.0,specularCloudsColor.g);
    cloudsMix *= dayMix;
    color = mix(color,vec3(1.0), cloudsMix);

    // freshnel
    float freshnel = dot(viewDirection,normal) + 1.0;
    freshnel = pow(freshnel,2.0);
    // color = vec3(freshnel);

    // atmosphere
    float atmosphereDayMix = smoothstep(-0.5,1.0,sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor,uAtmosphereDayColor,atmosphereDayMix);
    color = mix(color,atmosphereColor,freshnel * atmosphereDayMix);

    // specular 
    vec3 reflection = reflect(-uSunDirection,normal);
    float specular = - dot(reflection,viewDirection);
    specular = max(specular,0.0);
    specular = pow(specular,32.0);
    specular *= specularCloudsColor.r;
    vec3 specularColor = mix(vec3(1.0),atmosphereColor,freshnel);
    color += specular * specularColor;


    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
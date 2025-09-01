uniform sampler2D uTexture;
uniform vec3 uColor;

void main() {
    float  textureaAlpha = texture(uTexture,gl_PointCoord).r;

    // final size
    gl_FragColor = vec4(uColor,textureaAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
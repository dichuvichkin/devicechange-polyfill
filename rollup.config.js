import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/devicechange-polyfill.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: 'dist/devicechange-polyfill.cjs',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/devicechange-polyfill.min.js',
            format: 'esm',
            plugins: [terser()],
            sourcemap: true
        }
    ]
};

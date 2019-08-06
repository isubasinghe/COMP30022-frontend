const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  return workboxBuild
    .generateSW({
      swDest: 'build/sw.js', // this will be created in the build step
      globDirectory: 'build',
      globPatterns: ['**/*.{js,css,html,png,svg}'],
      navigateFallback: 'index.html',
      cleanupOutdatedCaches: true,
      runtimeCaching: []
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(err => {
      console.error(`Unable to generate a new service worker ${err}`);
    });
};
buildSW();

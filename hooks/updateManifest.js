const fs = require('fs');
const path = require('path');

module.exports = function(context) {
    const manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');

    if (fs.existsSync(manifestPath)) {
        let manifestContent = fs.readFileSync(manifestPath).toString();

        // Regular expression to find the <application> start tag
        const applicationTagRegex = /<application[^>]*android:supportsRtl="true"/g;

        // Replace the found <application> tag with the additional attributes
        manifestContent = manifestContent.replace(applicationTagRegex, match => {
            return `${match} android:usesCleartextTraffic="true" tools:replace="android:usesCleartextTraffic"`;
        });

        fs.writeFileSync(manifestPath, manifestContent);
    } else {
        console.error('AndroidManifest.xml not found!');
    }
};

#!/usr/bin/env bash
# Builds a debug APK. Needs: Node 18+, JDK 17, Android SDK (ANDROID_HOME set). Run from this folder.
set -e
rm -rf www && mkdir www && cp -r ../index.html ../art.js ../audio.js ../style.css ../manifest.webmanifest ../sw.js ../icons www/
npm install
[ -d android ] || npx cap add android
npx cap sync android
M=android/app/src/main/AndroidManifest.xml
grep -q screenOrientation $M || sed -i 's/<activity /<activity android:screenOrientation="sensorLandscape" /' $M
for s in android/app/src/main/res/values/styles.xml; do grep -q Fullscreen $s || sed -i 's#</style>#<item name="android:windowFullscreen">true</item></style>#' $s; done
(cd android && ./gradlew assembleDebug)
echo "APK: $(pwd)/android/app/build/outputs/apk/debug/app-debug.apk"

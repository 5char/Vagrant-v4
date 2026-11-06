VAGRANT ECHOES II: THE CATHEDRAL OF ASH  (v3 - pixel art + score)

WHAT'S NEW
- Pixel-art rendering: low-res iso scene upscaled with nearest-neighbour; sprites for hero (front/back, walk), wraiths, Iron Warden boss,
  stone floor tiles with brick edges, gothic pillars with torches, moonlit cathedral skyline, gems, slash arcs, dynamic torch lighting.
- Pixel UI skin and pixel icons on touch buttons.
- Original procedural music: title / explore / boss tracks (switches on boss floors) + sound effects. ♪ button (top centre) mutes.

RUN / INSTALL AS PWA (easiest on Android)
Host this folder over HTTPS (GitHub Pages, Netlify...), open in Chrome on Android > menu > Install app.  Works offline after first load.

BUILD A REAL APK
Open apk-build/ and run ./build_apk.sh (needs Node 18+, JDK 17, Android SDK). It wraps the game with Capacitor, forces landscape + fullscreen,
and outputs android/app/build/outputs/apk/debug/app-debug.apk. For Play Store release, sign it from Android Studio.

CONTROLS  Touch: stick, STRIKE, DASH, PACK.  Keyboard: WASD/arrows, Space, Shift, I.
Local testing: use a local server (e.g. python3 -m http.server) so the service worker registers.



adb devices

Generating the release AAB
npx react-native build-android --mode=release

Testing the release build of your app
npm run android -- --mode="release"

#Borrar apk de android'
cd android && ./gradlew clean &&  cd ..

#genera el apk
cd android && ./gradlew assembleRelease && cd ..
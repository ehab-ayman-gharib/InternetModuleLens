// @input Asset.InternetModule internetModule
// @input Asset.RemoteMediaModule remoteMediaModule
// @input Component.Image imageDisplay
// @input Component.Image videoDisplay
// @input Component.AudioComponent audioPlayer
// @input SceneObject gltfParent
//@input Asset.Material materialRef

//@input Component.Text loadingText;

const IMAGE_URL = 'https://picsum.photos/1080/1920';
const VIDEO_URL = 'https://media.w3.org/2010/05/sintel/trailer.mp4';
const AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
const GLTF_URL = 'https://dynamic-ar-viewer.pages.dev/api/models/Duck.glb';

function fetchRemoteImage() {
  print("Fetching image...");
  ResetAll();
  script.loadingText.enabled = true;
  try {
    // Check if the method exists on this platform (e.g., Camera Kit/Wearable vs standard Snapchat)
    if (script.internetModule.makeResourceFromUrl) {
      var resource = script.internetModule.makeResourceFromUrl(IMAGE_URL);

      script.remoteMediaModule.loadResourceAsImageTexture(
        resource,
        function (texture) {
          print("Image texture loaded successfully!");
          script.loadingText.enabled = false;
          if (script.imageDisplay) {
            script.imageDisplay.enabled = true;
            script.videoDisplay.enabled = false;
            script.imageDisplay.mainPass.baseTex = texture;
          }
        },
        function (error) {
          script.loadingText.enabled = false;
          print("Error loading image: " + error);
        }
      );
    } else {
      print("Warning: makeResourceFromUrl is not supported on this platform.");
    }
  } catch (e) {
    print("Exception in fetchRemoteImage: " + e.message);
  }
}

function fetchRemoteVideo() {
  print("Fetching video...");
  ResetAll();
  try {
    if (script.internetModule.makeResourceFromUrl) {
      var resource = script.internetModule.makeResourceFromUrl(VIDEO_URL);

      script.remoteMediaModule.loadResourceAsVideoTexture(
        resource,
        function (texture) {
          print("Video texture loaded successfully!");
          if (script.videoDisplay) {
            script.videoDisplay.enabled = true;
            script.imageDisplay.enabled = false;
            script.videoDisplay.mainPass.baseTex = texture;
            texture.control.play(-1);
          }
        },
        function (error) {
          print("Error loading video: " + error);
        }
      );
    } else {
      print("Warning: makeResourceFromUrl is not supported on this platform.");
    }
  } catch (e) {
    print("Exception in fetchRemoteVideo: " + e.message);
  }
}

function fetchAudio() {
  print("Fetching audio...");
  ResetAll();
  script.loadingText.enabled = true;
  try {
    // Check if the method exists on this platform
    if (script.internetModule.makeResourceFromUrl) {
      var resource = script.internetModule.makeResourceFromUrl(AUDIO_URL);

      script.remoteMediaModule.loadResourceAsAudioTrackAsset(
        resource,
        function (audioTrackAsset) {
          print("Audio track loaded successfully!");
          script.loadingText.enabled = false;
          if (script.audioPlayer) {
            script.audioPlayer.audioTrack = audioTrackAsset;
            script.audioPlayer.play(1); // Play once, use -1 for loop
          }
        },
        function (error) {
          script.loadingText.enabled = false;
          print("Error loading audio: " + error);
        }
      );
    } else {
      print("Warning: makeResourceFromUrl is not supported on this platform.");
    }
  } catch (e) {
    print("Exception in fetchAudio: " + e.message);
  }
}

var loadedGltfObject = null;

function fetchGltf() {
  print("Fetching glTF model...");
  ResetAll();
  script.loadingText.enabled = true;
  try {
    // Check if the method exists on this platform
    if (script.internetModule.makeResourceFromUrl) {
      var resource = script.internetModule.makeResourceFromUrl(GLTF_URL);

      script.remoteMediaModule.loadResourceAsGltfAsset(
        resource,
        function (gltfAsset) {
          print("glTF asset loaded successfully!");
          script.loadingText.enabled = false;
          if (script.gltfParent) {
            // Create GltfSettings for proper instantiation
            var gltfSettings = GltfSettings.create();
            gltfSettings.convertMetersToCentimeters = true;

            // Instantiate the glTF as a child of the parent object
            loadedGltfObject = gltfAsset.tryInstantiateWithSetting(script.gltfParent, script.materialRef, gltfSettings);
            if (loadedGltfObject) {
              print("glTF model instantiated successfully!");
            } else {
              print("Failed to instantiate glTF model.");
            }
          }
        },
        function (error) {
          script.loadingText.enabled = false;
          print("Error loading glTF: " + error);
        }
      );
    } else {
      print("Warning: makeResourceFromUrl is not supported on this platform.");
    }
  } catch (e) {
    print("Exception in fetchGltf: " + e.message);
  }
}

function ResetAll() {
  script.imageDisplay.enabled = false;
  script.imageDisplay.mainPass.baseTex = null;
  script.videoDisplay.mainPass.baseTex = null;
  script.videoDisplay.enabled = false;
  script.audioPlayer.audioTrack = null;
  if (script.audioPlayer.isPlaying())
    script.audioPlayer.stop(false);
  // Remove previously loaded glTF object
  if (loadedGltfObject) {
    loadedGltfObject.destroy();
    loadedGltfObject = null;
  }
}

script.FetchRemoteImage = fetchRemoteImage;
script.FetchRemoteVideo = fetchRemoteVideo;
script.FetchAudio = fetchAudio;
script.FetchGltf = fetchGltf;

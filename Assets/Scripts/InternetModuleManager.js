// @input Asset.InternetModule internetModule
// @input Asset.RemoteMediaModule remoteMediaModule
// @input Component.Image imageDisplay
// @input Component.Image videoDisplay

//@input Component.Text loadingText;

const IMAGE_URL = 'https://picsum.photos/1080/1920';
const VIDEO_URL = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

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

function ResetAll() {
  script.imageDisplay.enabled = false;
  script.imageDisplay.mainPass.baseTex = null;
  script.videoDisplay.mainPass.baseTex=null;
  script.videoDisplay.enabled = false;
}

script.FetchRemoteImage = fetchRemoteImage;
script.FetchRemoteVideo = fetchRemoteVideo;

const button = document.getElementById('button');

async function selectMediaStream() {
  try {
    const videoElement = document.getElementById('video');
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    console.log(videoElement)
    await videoElement.requestPictureInPicture()
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    console.error('arg', error);
  }
}


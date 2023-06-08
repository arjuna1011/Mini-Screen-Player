function initialize() {
    const videoElement = document.getElementById('video');
    const button = document.getElementById('button');
  
    async function selectMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
        };
      } catch (error) {
        console.log(error);
      }
    }
  
    button.addEventListener('click', async () => {
      button.disabled = true;
      if ('pictureInPictureEnabled' in document && document.pictureInPictureEnabled && 'requestPictureInPicture' in videoElement) {
        await videoElement.requestPictureInPicture();
      } else {
        console.log('Picture-in-picture not supported.');
      }
      button.disabled = false;
    });
  
    selectMediaStream();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    window.addEventListener('load', initialize);
  }
  
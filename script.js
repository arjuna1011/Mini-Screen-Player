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
      await videoElement.requestPictureInPicture();
      button.disabled = false;
    });
  
    selectMediaStream();
  }
  
  // Check if the DOM has already loaded
  if (document.readyState === 'loading') {
    // DOM is still loading, use DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM has already loaded, use load event
    window.addEventListener('load', initialize);
  }
  
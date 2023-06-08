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
        await videoElement.play().catch(error => {
            console.log('Error playing video:', error);
        });
            if (typeof videoElement.requestPictureInPicture === 'function') {
                try {
                    await videoElement.requestPictureInPicture();
                } catch (error) {
                    console.log('Error entering picture-in-picture:', error);
                }
            } else {
                console.log('Picture-in-picture not supported.');
            }
        button.disabled = false;
    });

    button.addEventListener('click', selectMediaStream);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    window.addEventListener('load', initialize);
}

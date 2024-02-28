import {useState, useEffect, useCallback, useRef} from 'react';
import ReactCrop from 'react-image-crop';

import Modal from 'components/modal';
import IconButton from 'components/icon-button';
import {base64ToBlob} from 'helpers';

import Placeholder from 'assets/img/placeholder.svg';
import {ReactComponent as Yes} from 'assets/icons/yes.svg';
import {ReactComponent as No} from 'assets/icons/no.svg';

import 'react-image-crop/dist/ReactCrop.css';
import './styles.scss';

const Avatar = ({src, filename, save}) => {
  const imageRef = useRef(); // Add a ref to track the current image
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [cropSettings, setCropSettings] = useState({
    unit: 'px',
    x: 50,
    y: 50,
    width: 412,
    height: 412
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imagePreviewURL, setImagePreviewUrl] = useState(src);
  const cropImage = useCallback(async() => {
    if (!image || !cropSettings.width || !cropSettings.height) {
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set the canvas size to the crop dimensions
    canvas.width = cropSettings.width * scaleX;
    canvas.height = cropSettings.height * scaleY;

    const ctx = canvas.getContext('2d');

    // Draw the cropped image on the canvas
    ctx.drawImage(
      image,
      cropSettings.x * scaleX, // Start clipping x
      cropSettings.y * scaleY, // Start clipping y
      cropSettings.width * scaleX, // Clipping width
      cropSettings.height * scaleY, // Clipping height
      0, // Place the clipped part at this x position in canvas
      0, // Place the clipped part at this y position in canvas
      canvas.width, // Width of clipped image on canvas
      canvas.height // Height of clipped image on canvas
    );

    // Convert the canvas to URL
    try {
      const dataURL = canvas.toDataURL('image/png');
      const {url: croppedImageUrl} = await fetch(dataURL);

      setCroppedImageUrl(croppedImageUrl);
    } catch (error) {
      console.log(error);

      return null;
    }
  }, [image, imagePreviewURL, cropSettings]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const existingCanvas = document.querySelector('canvas');

    if (existingCanvas) {
      existingCanvas.parentNode.removeChild(existingCanvas);
    }

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const currentImageUrl = reader.result;

        imageRef.current = currentImageUrl; // Store the current image URL

        const img = new Image();

        img.onload = () => {
          // Check if the image is still the current image
          if (imageRef.current === currentImageUrl) {
            const canvasSize = 512;
            const scaleSize = Math.min(canvasSize / img.width, canvasSize / img.height);
            const scaledWidth = img.width * scaleSize;
            const scaledHeight = img.height * scaleSize;
            const offsetX = (canvasSize - scaledWidth) / 2;
            const offsetY = (canvasSize - scaledHeight) / 2;
            const canvas = document.querySelector('canvas') || document.createElement('canvas');

            canvas.width = canvasSize;
            canvas.height = canvasSize;

            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

            const resizedImageSrc = canvas.toDataURL('image/png');

            img.src = resizedImageSrc;
            img.onload = null;

            setImagePreviewUrl(resizedImageSrc);
            setImage(img); // Directly use the data URL
            setIsPreviewOpen(true);
          }
        };

        img.src = currentImageUrl;
        // Release memory for the FileReader result
        URL.revokeObjectURL(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setImagePreviewUrl(src); // Clear the image preview
    setImage(null); // Clear the image
    setCroppedImageUrl(null); // Clear the cropped image
    setIsPreviewOpen(false);
    document.getElementById('imageUpload').value = '';
  };

  const handleSubmit = async() => {
    if (!save) {
      return;
    }

    const mimeType = 'image/png'; // The MIME type of your base64 string
    const blob = base64ToBlob(croppedImageUrl, mimeType);
    const file = new File([blob], `${filename}.png`, {type: mimeType});

    await save(file);

    setIsPreviewOpen(false);
    setImage(null);
    document.getElementById('imageUpload').value = '';
  };

  useEffect(() => {
    if (image) {
      cropImage();
    }
  }, [image]);

  return (
    <div className='avatar-container'>
      <div className='avatar-upload'>
        <div className='avatar-edit'>
          <input type='file' id='imageUpload' accept='.png, .jpg, .jpeg, .webp' onChange={handleFileChange} />
          <label htmlFor='imageUpload'></label>
        </div>
        <div className='avatar-preview'>
          <img id='imagePreview' src={croppedImageUrl || src || Placeholder} alt='Croped output' />
        </div>
      </div>
      {imagePreviewURL && isPreviewOpen && (
        <Modal visible={imagePreviewURL} closeModal={closeModal}>
          <div className='avatar-crop'>
            <ReactCrop
              aspect={1}
              src={imagePreviewURL}
              crop={cropSettings}
              ruleOfThirds
              circularCrop
              onComplete={cropImage}
              onChange={setCropSettings}
            >
              <img src={imagePreviewURL} alt='Preview' />
            </ReactCrop>
          </div>
          <div className='avatar-crop-buttons-container'>
            <IconButton
              icon={Yes}
              tooltipText='Save'
              onClick={handleSubmit}
            />
            <IconButton
              icon={No}
              tooltipText='Cancel'
              onClick={closeModal}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
class ImageUtils {
    static getMimeTypeFromImageUrl(imageUrl) {
        
        const pathPart = imageUrl.split('?')[0];
        const segments = pathPart.split('/');
        let fileExtension = null;
    
        for (let i = segments.length - 1; i >= 0; i--) {
          const segment = segments[i];
          if (segment.includes('.')) {
            fileExtension = segment.split('.').pop().toLowerCase();
            break;
          }
        }
        //console.log("File Extension:", fileExtension);
        const mimeTypes = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            bmp: 'image/bmp',
            webp: 'image/webp',
            svg: 'image/svg+xml',
            tiff: 'image/tiff',
            ico: 'image/x-icon',
            avif: 'image/avif',
        };
  
      return mimeTypes[fileExtension] || null;
    }
  
  } 
  
  export { ImageUtils };
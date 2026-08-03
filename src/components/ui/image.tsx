import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fittingType?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, fittingType, className, style, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        objectFit: fittingType === 'fill' ? 'cover' : 'contain',
        ...style
      }}
      onError={(e) => {
        // Hide broken image icon if image fails to load
        (e.target as HTMLElement).style.opacity = '0';
      }}
      {...props}
    />
  );
};

export default Image;

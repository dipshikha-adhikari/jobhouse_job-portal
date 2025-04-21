import React from "react";
import NotFoundImage from "/error.webp";
import ServerErrorImage from "/error.webp";
import GenericErrorImage from "/error.webp";

interface ErrorProps {
  code?: number;
}
const Error: React.FC<ErrorProps> = ({ code }) => {
  let image, message;

  switch (code) {
    case 0:
      image = GenericErrorImage;
      message = "Unable to connect to the server.";
      break;
    case 404:
      image = NotFoundImage;
      message = "Page not found.";
      break;
    case 500:
      image = ServerErrorImage;
      message = "Internal server error.";
      break;
    default:
      image = GenericErrorImage;
      message = "Something went wrong.";
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img src={image} alt="Error" className="w-[300px] h-auto mb-4" />
      <h1 className="text-2xl font-bold">{message}</h1>
      {code !== undefined && (
        <p className="text-gray-600 mt-2">Error Code: {code}</p>
      )}
    </div>
  );
};

export default Error;

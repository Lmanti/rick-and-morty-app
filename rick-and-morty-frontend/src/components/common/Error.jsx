import { AlertCircle } from 'lucide-react';

export const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2"> Oops! Something went wrong </h3>
        <p className="text-gray-600">{message || 'Please try again later'}</p>
      </div>
    </div>
  );
};
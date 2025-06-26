const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-gray-600 text-lg">La página que buscás no existe.</p>
      </div>
    </div>
  );
};

export default NotFound;

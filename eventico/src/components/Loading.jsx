const Loading = () => {
    return (
        <div className="flex justify-center items-center mt-8">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
  };
  
  export default Loading;
  
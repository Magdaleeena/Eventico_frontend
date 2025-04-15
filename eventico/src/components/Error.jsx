const Error = ({ message = "Something went wrong." }) => {
    return (
      <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded text-center my-4">
        {message}
      </div>
    );
  };
  
  export default Error;
  
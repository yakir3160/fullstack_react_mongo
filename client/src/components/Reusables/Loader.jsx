


const Loader = ({text}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center justify-center min-h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
    <p className="text-gray-600">{text}</p>
</div>
  );
}
export default Loader;
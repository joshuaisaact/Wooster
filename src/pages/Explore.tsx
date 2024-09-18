import Header from '../components/Header';

function Explore() {
  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>Explore</Header>

      <form className="flex flex-col gap-2 bg-green-800 p-4">
        <h2>Create a trip!</h2>
        <label>Days:</label>
        <input type="range" id="days" name="days" min="1" max="3" />
        <label>Location:</label>
        <input type="text" id="location" name="location" />
        <button className="flex items-center justify-center rounded-lg px-4 py-2 text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white">
          Go!
        </button>
      </form>
    </div>
  );
}

export default Explore;

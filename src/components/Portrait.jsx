function Portrait({ image, name, position, description }) {
  return (
    <div className="prt flex flex-col items-center bg-[#1a1a1a] p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-[rgba(255,145,145,0.95)] transition-all duration-700 h-full">
      <img
        src={image}
        alt={name}
        className="w-60 h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-xl font-semibold text-[rgba(255,145,145,0.95)]">
        {name}
      </h3>
      <p className="text-gray-400 text-sm italic mb-2">{position}</p>
      <p className="text-white text-sm text-center flex-grow">{description}</p>
    </div>
  );
}

export default Portrait;

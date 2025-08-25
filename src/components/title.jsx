const Title = ({ isDarkTheme }) => {
  return (
    <div className="text-center mb-4">
      <h2 className={`text-5xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
        It doesn&apos;t have to be pretty.
        <span className="inline-block animate-pulse ml-1 scale-x-50">|</span>
      </h2>
    </div>
  );
};

export default Title;

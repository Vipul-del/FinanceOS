function Header({ title, subtitle }) {
  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = now.getHours();

  let greeting = "Hello";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex justify-between items-center">
      <div>
        <p className="text-sm text-blue-600 font-semibold">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-1">
          {greeting}, Vipul 👋
        </h2>

        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>
      </div>

      <div className="text-right">
        <p className="text-gray-600 font-medium">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default Header;
function FinancialHealth() {
  const score = 82;

  let color = "text-red-500";

  if (score >= 80) {
    color = "text-green-600";
  } else if (score >= 60) {
    color = "text-yellow-500";
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Financial Health
      </h2>

      <div className={`text-5xl font-bold ${color}`}>
        {score}
      </div>

      <p className="mt-3 text-gray-600">
        Excellent financial progress. Keep investing consistently.
      </p>

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span>Health Score</span>
          <span>{score}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default FinancialHealth;
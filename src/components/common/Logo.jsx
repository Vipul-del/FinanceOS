function Logo() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
        F
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">
          FinanceOS
        </h1>

        <p className="text-xs text-gray-400">
          Personal Finance Manager
        </p>
      </div>
    </div>
  );
}

export default Logo;
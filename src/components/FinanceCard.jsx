function FinanceCard({title, value, icon}) {

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between items-center">

        <h3 className="text-gray-600 font-medium">
          {title}
        </h3>

        {icon}

      </div>


      <h2 className="text-3xl font-bold mt-4">
        {value}
      </h2>

    </div>
  );

}

export default FinanceCard;
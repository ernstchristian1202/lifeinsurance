import { useState } from "react";

export default function Home() {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [dependents, setDependents] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("Medium");
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    setExplanation(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/recommendation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: parseInt(age),
            income: parseFloat(income),
            dependents: parseInt(dependents),
            riskTolerance,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
      setExplanation(data.explanation);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Life Insurance Recommendation
      </h1>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your annual income"
            />
          </div>
        </div>


        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Number of Dependents</label>
            <input
              type="number"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of dependents"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Recommendation
        </button>
      </form>

      {error && <p className="text-red-600 text-center mt-6">{error}</p>}

      {recommendation && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-600">Recommendation</h2>
          <p className="mt-4 text-gray-700">{recommendation}</p>
          <p className="mt-2 text-gray-500">{explanation}</p>
        </div>
      )}
    </div>
  );
}

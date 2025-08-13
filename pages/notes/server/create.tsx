import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateServerNote() {
  const router = useRouter();
  const [payload, setPayload] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ errors: { [key: string]: string } } | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }

      if (data.success) {
        // Reset form state before redirect
        setPayload({ title: "", description: "" });
        setError(null);

        // Redirect to notes list
        router.push("/notes/server");
      } else {
        setError({ errors: { general: data.message || "Failed to create note" } });
      }
    } catch (error) {
      console.error(error);
      setError({ errors: { general: "Network error occurred" } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 ">Create Note</h2>

      {/* General Error Message */}
      {error && error.errors && error.errors.general && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error.errors.general}</div>}

      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={payload.title}
            onChange={(event) => setPayload({ ...payload, title: event.target.value })}
            placeholder="Input title ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error && typeof error === "object" && error.errors && <small className="text-red-500">{error.errors.title}</small>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={payload.description}
            onChange={(event) => setPayload({ ...payload, description: event.target.value })}
            placeholder="Input description ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error && typeof error === "object" && error.errors && <small className="text-red-500">{error.errors.description}</small>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

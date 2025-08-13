import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

type ListNotes = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type Notes = {
  data: ListNotes;
  message: string;
  status: string;
};

export const getServerSideProps: GetServerSideProps<{ note: Notes | null; error?: string }> = async (context) => {
  const { params } = context;

  try {
    const response = await fetch(`https://service.pace11.my.id/api/note/${params?.id || ""}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const note: Notes = await response.json();
    return { props: { note } };
  } catch (error) {
    console.error("Error fetching note:", error);
    return {
      props: {
        note: null,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
};

export default function NotePage({ note, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (error || !note) {
    return <div>Error: {error || "Note not found"}</div>;
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {note.status} - {note.message}
            </span>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Note #{note.data.id}: {note.data.title}
            </h1>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>Created: {new Date(note.data.created_at).toLocaleString()}</span>
              <span>Updated: {new Date(note.data.updated_at).toLocaleString()}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed">{note.data.description}</p>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Link href="/notes/server" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              ← Back to Notes List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

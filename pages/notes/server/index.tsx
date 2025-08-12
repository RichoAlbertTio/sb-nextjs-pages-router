import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
type ListNotes = {
  id: number;
  title: string;
  description: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
};

type Notes = {
  success: boolean;
  message: string;
  data: ListNotes[];
};

export const getServerSideProps: GetServerSideProps<{ notes: Notes }> = async () => {
  const response = await fetch("https://service.pace11.my.id/api/notes");
  const notes: Notes = await response.json();
  return { props: { notes } };
};

export default function NotesServerPage({ notes }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {notes.data.map((note: ListNotes) => (
        <Link href={`/notes/server/${note.id}`} key={note.id} className="p-4 bg-white shadow-sm rounded-lg">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </Link>
      ))}
    </div>
  );
}

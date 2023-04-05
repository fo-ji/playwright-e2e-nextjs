'use client';
export default function Error({ error }: { error: Error }) {
  console.log({ error });

  return (
    <div>
      <p className="mt-6 text-center text-red-500">
        Data fetching in server failed
      </p>
    </div>
  );
}

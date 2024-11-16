import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/file-upload';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Welcome to FileXchange</h1>
      </div>

      <div className="relative flex place-items-center">
        <FileUpload />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Button variant="outline" className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          View Files
        </Button>
      </div>
    </main>
  );
}
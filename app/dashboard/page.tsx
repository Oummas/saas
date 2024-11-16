import { auth } from "@/auth";
import { FileUpload } from "@/components/file-upload";

export default async function DashboardPage() {
  const session = await auth();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="max-w-2xl mx-auto">
        <FileUpload
          onUpload={async (file) => {
            // TODO: Implement file upload logic
            console.log("File to upload:", file);
          }}
        />
      </div>
    </div>
  );
}
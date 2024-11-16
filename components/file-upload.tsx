"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setUploading(true);
      const file = acceptedFiles[0];
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      // TODO: Implement actual file upload logic here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setProgress(100);
      
      toast({
        title: "Success!",
        description: "File uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-10 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
          hover:border-primary hover:bg-primary/5
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-sm text-gray-600">
          {isDragActive
            ? "Drop the file here"
            : "Drag 'n' drop a file here, or click to select"}
        </p>
      </div>

      {uploading && (
        <div className="mt-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Button
          disabled={uploading}
          onClick={() => document.querySelector('input')?.click()}
        >
          Select File
        </Button>
      </div>
    </div>
  );
}
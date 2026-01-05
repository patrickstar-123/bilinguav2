import { Card, CardContent } from './ui/card';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
          <p className="text-lg text-gray-700">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}

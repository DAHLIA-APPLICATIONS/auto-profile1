'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Check, Link as LinkIcon } from 'lucide-react';

export default function ServicesPage() {
  const router = useRouter();
  const { state, toggleService } = useApp();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          連携サービス一覧
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          利用したいサービスを連携してください
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {state.services.map((service) => (
          <Card
            key={service.id}
            className={`transition-all duration-200 hover:shadow-lg ${
              service.connected 
                ? 'ring-2 ring-green-500 bg-green-50' 
                : 'hover:shadow-md'
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{service.name}</span>
                {service.connected && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">連携済み</span>
                  </div>
                )}
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => toggleService(service.id)}
                className={`w-full ${
                  service.connected
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {service.connected ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    連携解除
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    連携する
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={() => router.push('/profile')}>
          プロフィール編集
        </Button>
        <Button onClick={() => router.push('/dashboard')}>
          ダッシュボードへ
        </Button>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
          プロフィール自動登録アプリ
        </h1>
        <p className="text-sm sm:text-lg text-gray-600">
          個人情報の管理と外部サービスとの連携を自動化
        </p>
      </div>

      <div className="space-y-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>プロフィール入力</span>
            </CardTitle>
            <CardDescription>
              基本情報、学歴、職歴、資格・免許情報を入力
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile">
              <Button className="w-full">
                入力を開始
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-green-600" />
              <span>サービス連携</span>
            </CardTitle>
            <CardDescription>
              外部サービスとの連携設定
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/services">
              <Button className="w-full">
                連携設定
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>ダッシュボード</span>
            </CardTitle>
            <CardDescription>
              入力済み情報と連携状況を確認
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full">
                確認する
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
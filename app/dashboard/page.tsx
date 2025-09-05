'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { User, Calendar, MapPin, Phone, Mail, Users, GraduationCap, Briefcase, Award, Settings, RotateCcw } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { state, resetAll } = useApp();
  const { profile, services } = state;

  const connectedServices = services.filter(service => service.connected);
  
  const handleReset = () => {
    if (confirm('全ての入力内容がリセットされます。よろしいですか？')) {
      resetAll();
      router.push('/');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  const formatMonthDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    return `${year}年${month}月`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <Button
          onClick={handleReset}
          variant="destructive"
          className="flex items-center space-x-1 text-sm px-3 py-2"
        >
          <RotateCcw className="h-3 w-3" />
          <span>最初からやり直す</span>
        </Button>
      </div>

      {/* プロフィール情報 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>基本情報</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.name ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">氏名:</span>
                  <span>{profile.name}</span>
                </div>
                
                {profile.nameKana && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">ふりがな:</span>
                    <span>{profile.nameKana}</span>
                  </div>
                )}
                
                {profile.birthDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">生年月日:</span>
                    <span>{formatDate(profile.birthDate)}</span>
                  </div>
                )}
                
                {profile.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="font-medium">住所:</span>
                    <span>{profile.address}</span>
                  </div>
                )}
                
                {profile.gender && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">性別:</span>
                    <span>
                      {profile.gender === 'male' ? '男性' : 
                       profile.gender === 'female' ? '女性' : 'その他'}
                    </span>
                  </div>
                )}

                {profile.maritalStatus && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">婚姻歴:</span>
                    <span>{profile.maritalStatus === 'married' ? '既婚' : '未婚'}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {profile.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">電話番号:</span>
                    <span>{profile.phone}</span>
                  </div>
                )}
                
                {profile.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">メール:</span>
                    <span>{profile.email}</span>
                  </div>
                )}
                
                {profile.dependents && (
                  <div className="flex items-start space-x-2">
                    <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="font-medium">扶養人数:</span>
                    <span>{profile.dependents}人</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">プロフィール情報が入力されていません</p>
              <Button onClick={() => router.push('/profile')}>
                プロフィールを入力
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 学歴 */}
      {profile.educations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-green-600" />
              <span>学歴</span>
              <Badge variant="secondary">{profile.educations.length}/20</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.educations.map((education, index) => (
                <div key={education.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{education.schoolName}</p>
                  {education.department && (
                    <p className="text-sm text-gray-600">{education.department}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    {formatMonthDate(education.startDate)} ～ {formatMonthDate(education.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 職歴 */}
      {profile.workHistories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-orange-600" />
              <span>職歴</span>
              <Badge variant="secondary">{profile.workHistories.length}/20</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.workHistories.map((work, index) => (
                <div key={work.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{work.companyName}</p>
                  {work.department && (
                    <p className="text-sm text-gray-600">{work.department}</p>
                  )}
                  {work.position && (
                    <p className="text-sm text-gray-600">役職: {work.position}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    {formatMonthDate(work.startDate)} ～ {formatMonthDate(work.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 資格 */}
      {profile.qualifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span>資格・免許</span>
              <Badge variant="secondary">{profile.qualifications.length}/20</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.qualifications.map((qualification, index) => (
                <div key={qualification.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{qualification.qualificationName}</p>
                  <p className="text-sm text-gray-600">
                    取得日: {formatMonthDate(qualification.acquisitionDate)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 連携サービス */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-indigo-600" />
            <span>連携サービス</span>
            <Badge variant="secondary">{connectedServices.length}/3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {connectedServices.length > 0 ? (
            <div className="space-y-3">
              {connectedServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">{service.name}</p>
                    <p className="text-sm text-green-600">{service.description}</p>
                  </div>
                  <Badge className="bg-green-600">連携済み</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">連携しているサービスはありません</p>
              <Button onClick={() => router.push('/services')}>
                サービスを連携
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 統計情報カード */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">入力完了率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(((profile.name ? 1 : 0) + 
                          (profile.birthDate ? 1 : 0) + 
                          (profile.address ? 1 : 0) + 
                          (profile.phone ? 1 : 0) + 
                          (profile.email ? 1 : 0)) / 5 * 100)}%
            </div>
            <p className="text-sm text-gray-600">基本情報の入力状況</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">総履歴数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {profile.educations.length + profile.workHistories.length + profile.qualifications.length}
            </div>
            <p className="text-sm text-gray-600">学歴・職歴・資格の合計</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">連携率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(connectedServices.length / services.length * 100)}%
            </div>
            <p className="text-sm text-gray-600">サービス連携の進捗</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button onClick={() => router.push('/')}>
          ホームに戻る
        </Button>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => router.push('/profile')}>
            プロフィール編集
          </Button>
          <Button onClick={() => router.push('/services')}>
            サービス連携
          </Button>
        </div>
      </div>
    </div>
  );
}
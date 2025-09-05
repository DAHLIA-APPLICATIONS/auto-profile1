'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/FormField';
import { DynamicEntryForm } from '@/components/DynamicEntryForm';
import { useApp } from '@/contexts/AppContext';
import { Education, WorkHistory, Qualification } from '@/types';
import { getValidationWarnings } from '@/utils/validation';
import { AlertCircle, Save } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { state, updateProfile } = useApp();
  const [formData, setFormData] = useState(state.profile);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const warnings = getValidationWarnings(formData);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = '氏名は必須です';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateProfile(formData);
    router.push('/dashboard');
  };

  const createNewEducation = (): Education => ({
    id: Date.now().toString(),
    schoolName: '',
    department: '',
    startDate: '',
    endDate: '',
  });

  const createNewWorkHistory = (): WorkHistory => ({
    id: Date.now().toString(),
    companyName: '',
    department: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const createNewQualification = (): Qualification => ({
    id: Date.now().toString(),
    qualificationName: '',
    acquisitionDate: '',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">プロフィール情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 基本情報 */}
          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="氏名" required error={errors.name}>
              <Input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="山田 太郎"
              />
            </FormField>

            <FormField label="ふりがな">
              <Input
                value={formData.nameKana}
                onChange={(e) => updateField('nameKana', e.target.value)}
                placeholder="やまだ たろう"
              />
            </FormField>

            <FormField label="生年月日">
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateField('birthDate', e.target.value)}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="住所">
                <Input
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="〒123-4567 東京都渋谷区神宮前1-1-1"
                />
              </FormField>
            </div>

            <FormField label="性別">
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男性</SelectItem>
                  <SelectItem value="female">女性</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="電話番号">
              <Input
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="090-1234-5678"
              />
            </FormField>

            <FormField label="メールアドレス">
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="example@email.com"
              />
            </FormField>

            <FormField label="婚姻歴">
              <Select value={formData.maritalStatus} onValueChange={(value) => updateField('maritalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="married">既婚</SelectItem>
                  <SelectItem value="single">未婚</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="扶養人数">
              <Input
                type="number"
                value={formData.dependents}
                onChange={(e) => updateField('dependents', e.target.value)}
                placeholder="0"
                min="0"
              />
            </FormField>
          </div>

          {/* 警告メッセージ */}
          {warnings.length > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    入力内容をご確認ください
                  </h4>
                  <ul className="mt-1 text-sm text-yellow-700 list-disc list-inside">
                    {warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 学歴 */}
      <Card>
        <CardContent className="pt-6">
          <DynamicEntryForm
            <Education>
            title="学歴"
            entries={formData.educations}
            onUpdate={(educations) => setFormData(prev => ({ ...prev, educations }))}
            maxEntries={20}
            fields={[
              { key: 'schoolName', label: '学校名', placeholder: '○○大学' },
              { key: 'department', label: '学部・学科', placeholder: '工学部 情報工学科' },
              { key: 'startDate', label: '開始年月', placeholder: '2020-04', type: 'month' },
              { key: 'endDate', label: '終了年月', placeholder: '2024-03', type: 'month' },
            ]}
            createNew={createNewEducation}
          />
        </CardContent>
      </Card>

      {/* 職歴 */}
      <Card>
        <CardContent className="pt-6">
          <DynamicEntryForm
            <WorkHistory>
            title="職歴"
            entries={formData.workHistories}
            onUpdate={(workHistories) => setFormData(prev => ({ ...prev, workHistories }))}
            maxEntries={20}
            fields={[
              { key: 'companyName', label: '会社名', placeholder: '株式会社○○' },
              { key: 'department', label: '部署・プロジェクト', placeholder: '開発部 Webサービス開発' },
              { key: 'position', label: '役職', placeholder: '主任' },
              { key: 'startDate', label: '開始年月', placeholder: '2020-04', type: 'month' },
              { key: 'endDate', label: '終了年月', placeholder: '2024-03', type: 'month' },
            ]}
            createNew={createNewWorkHistory}
          />
        </CardContent>
      </Card>

      {/* 資格 */}
      <Card>
        <CardContent className="pt-6">
          <DynamicEntryForm
            <Qualification>
            title="資格・免許"
            entries={formData.qualifications}
            onUpdate={(qualifications) => setFormData(prev => ({ ...prev, qualifications }))}
            maxEntries={20}
            fields={[
              { key: 'qualificationName', label: '資格・免許名', placeholder: '普通自動車第一種運転免許' },
              { key: 'acquisitionDate', label: '取得年月', placeholder: '2020-04', type: 'month' },
            ]}
            createNew={createNewQualification}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
      <div className="flex justify-between w-full">
        <Button onClick={() => router.push('/')}>
          ホームに戻る
        </Button>
        <Button onClick={() => { handleSubmit(); router.push('/services'); }}>
          <Save className="h-4 w-4 mr-2" />
          保存して次へ
        </Button>
      </div>
    </div>
    </div>
  );
}
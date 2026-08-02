'use client';

import dynamic from 'next/dynamic';

const FieldsMap = dynamic(() => import('./FieldsMap'), { ssr: false });

type Field = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export default function FieldsMapWrapper({ fields }: { fields: Field[] }) {
  return <FieldsMap fields={fields} />;
}
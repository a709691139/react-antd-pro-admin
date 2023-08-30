import { getAllDict } from '@/services/ant-design-pro/api';
import { useMount } from 'ahooks';
import { useState } from 'react';

export default function Dict() {
  const [dictMaps, setDictMaps] = useState<{
    [key: string]: {
      [value: string]: string;
    };
  }>({});
  const [dicts, setDicts] = useState<{
    [key: string]: API.DictItem[];
  }>({});

  useMount(async () => {
    let storageDicts: any = [];
    if (sessionStorage.getItem('DICT')) {
      storageDicts = JSON.parse(sessionStorage.getItem('DICT') as string);
    } else {
      const { data } = await getAllDict();
      sessionStorage.setItem('DICT', JSON.stringify(data));
      storageDicts = data;
    }
    const mapData: any = {};
    const maps: any = {};
    storageDicts.forEach((item: any) => {
      const { code, items } = item;
      maps[code] = [];
      mapData[code] = {};
      items.forEach((v: any) => {
        maps[code].push({
          label: v.label,
          value: v.value,
          id: v.value,
          text: v.label,
        });
        mapData[code][v.value] = v.label;
      });
      maps[code].sort((a: any, b: any) => a.sortNo - b.sortNo);
    });
    console.log('mapData', mapData);
    setDictMaps(mapData);
    setDicts(maps);
  });

  return { dicts, dictMaps };
}

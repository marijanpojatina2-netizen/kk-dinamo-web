'use client'

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
// Ispravna relativna putanja: izlazimo 3 razine van (app/studio/[[...index]]) do roota, pa u cms
import { schemaTypes } from '../../../cms/schemaTypes/index';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p474xc12';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const config = defineConfig({
  name: 'default',
  title: 'KK Dinamo Admin',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />
}
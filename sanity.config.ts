
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './app/lib/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p474xc12';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'KK Dinamo Admin',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sadržaj')
          .items([
            S.listItem()
              .title('Postavke Naslovnice')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),

            S.listItem()
              .title('Postavke Škole')
              .id('schoolPage')
              .child(S.document().schemaType('schoolPage').documentId('schoolPage')),

            S.listItem()
              .title('Postavke Sponzora')
              .id('sponsorsPage')
              .child(S.document().schemaType('sponsorsPage').documentId('sponsorsPage')),

            S.listItem()
              .title('O Klubu')
              .id('clubInfo')
              .child(S.document().schemaType('clubInfo').documentId('clubInfo')),

            S.divider(),

            // NOVO: Pravne stranice (Singletons)
            S.listItem()
              .title('Impresum')
              .id('impresum')
              .child(S.document().schemaType('legalPage').documentId('impresum')),
            
            S.listItem()
              .title('Politika Privatnosti')
              .id('privacyPolicy')
              .child(S.document().schemaType('legalPage').documentId('privacyPolicy')),

            S.divider(),

            ...S.documentTypeListItems().filter(
              (listItem) => ![
                'homepage', 
                'schoolPage', 
                'sponsorsPage', 
                'clubInfo',
                'legalPage', // Sakrij legalPage iz generičke liste
                'trainingLocation', 
                'youthTeam', 
                'sponsor'
              ].includes(listItem.getId() as string)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

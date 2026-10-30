import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Progetto Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID Progetto',
      type: 'string',
      description: 'Identificativo univoco (es: p01-realizzazione-nuovo-edificio)',
    }),
    defineField({
      name: 'title',
      title: 'Titolo dell\'Opera',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Edilizia Scolastica', value: 'Edilizia Scolastica' },
          { title: 'Infrastrutture', value: 'Infrastrutture' },
          { title: 'Sport', value: 'Sport' },
          { title: 'Sanità', value: 'Sanità' },
          { title: 'Restauro', value: 'Restauro' },
          { title: 'Cultura', value: 'Cultura' },
          { title: 'Dissesto Idrogeologico', value: 'Dissesto Idrogeologico' },
          { title: 'Residenziale', value: 'Residenziale' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descrizione Dettagliata',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Immagine Principale (WebP)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Luogo',
      type: 'string',
    }),
    defineField({
      name: 'client',
      title: 'Stazione Appaltante / Cliente',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Importo Lavori',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Servizi Svolti',
      type: 'string',
    }),
    defineField({
      name: 'rank',
      title: 'Posizione in Graduatoria',
      type: 'string',
      options: {
        list: [
          { title: '1° Posto', value: '1° Posto' },
          { title: '2° Posto', value: '2° Posto' },
          { title: '3° Posto', value: '3° Posto' },
        ],
      },
    }),
    defineField({
      name: 'credits',
      title: 'Crediti & Team Esecutivo',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Galleria Immagini',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'order',
      title: 'Ordine di Visualizzazione Generale',
      type: 'number',
      description: 'Numero progressivo per decidere la posizione nell\'archivio generale (es. 1, 2, 3...)',
      initialValue: 99,
    }),
    defineField({
      name: 'featuredInHome',
      title: 'Mostra nella Home Page',
      type: 'boolean',
      description: 'Se attivo, questo progetto viene inserito nel carosello della Home Page',
      initialValue: true,
    }),
    defineField({
      name: 'orderHome',
      title: 'Ordine Specifico nel Carosello Home',
      type: 'number',
      description: 'Numero progressivo per decidere l\'ordine esatto delle slide nella Home (es. 1, 2, 3...)',
    }),
  ],
})

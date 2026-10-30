import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Articolo Blog / News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo Articolo',
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
          { title: 'Normativa', value: 'Normativa' },
          { title: 'Tecnica', value: 'Tecnica' },
          { title: 'BIM', value: 'BIM' },
          { title: 'Case Study', value: 'Case Study' },
          { title: 'Generale', value: 'Generale' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Estratto / Riassunto Breve',
      type: 'text',
      description: 'Breve sintesi visualizzata nella griglia degli articoli',
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine di Copertina (WebP)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Contenuto Articolo',
      type: 'text',
      description: 'Testo completo dell\'articolo o approfondimento',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data di Pubblicazione',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Autore',
      type: 'string',
      initialValue: 'MBA Progetti',
    }),
    defineField({
      name: 'order',
      title: 'Ordine di Visualizzazione Generale',
      type: 'number',
      description: 'Numero progressivo per decidere la posizione nell\'elenco articoli (es. 1, 2, 3...)',
      initialValue: 99,
    }),
    defineField({
      name: 'featuredInHome',
      title: 'Mostra nella Home Page',
      type: 'boolean',
      description: 'Se attivo, questo articolo viene inserito nel carosello delle News in Home',
      initialValue: true,
    }),
    defineField({
      name: 'orderHome',
      title: 'Ordine Specifico nel Carosello Home',
      type: 'number',
      description: 'Numero progressivo per decidere l\'ordine delle slide nella Home (es. 1, 2, 3...)',
    }),
  ],
})

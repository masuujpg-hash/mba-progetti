export default {
  name: 'article',
  title: 'Articolo Blog / News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo Articolo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
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
    },
    {
      name: 'excerpt',
      title: 'Estratto / Riassunto Breve',
      type: 'text',
      description: 'Breve sintesi visualizzata nella griglia degli articoli',
    },
    {
      name: 'coverImage',
      title: 'Immagine di Copertina (WebP)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Contenuto Articolo',
      type: 'text',
      description: 'Testo completo dell\'articolo o approfondimento',
    },
    {
      name: 'publishedAt',
      title: 'Data di Pubblicazione',
      type: 'datetime',
    },
    {
      name: 'author',
      title: 'Autore',
      type: 'string',
      initialValue: 'MBA Progetti',
    },
  ],
}

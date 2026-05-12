export default {
  name: 'project',
  title: 'Progetto',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID Vecchio Sito',
      type: 'string',
      description: 'L\'ID numerico usato in precedenza (es: 01, 02)',
    },
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Immagine Principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'location',
      title: 'Luogo',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
    },
    {
      name: 'client',
      title: 'Cliente',
      type: 'string',
    },
    {
      name: 'amount',
      title: 'Importo',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Servizi',
      type: 'string',
    },
    {
      name: 'credits',
      title: 'Credits',
      type: 'string',
    },
    {
      name: 'rank',
      title: 'Posizionamento (es: 1°)',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Galleria Immagini',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}

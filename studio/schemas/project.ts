export default {
  name: 'project',
  title: 'Progetto Portfolio',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID Progetto',
      type: 'string',
      description: 'Identificativo univoco (es: p01-realizzazione-nuovo-edificio)',
    },
    {
      name: 'title',
      title: 'Titolo dell\'Opera',
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
    },
    {
      name: 'description',
      title: 'Descrizione Dettagliata',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Immagine Principale (WebP)',
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
      name: 'client',
      title: 'Stazione Appaltante / Cliente',
      type: 'string',
    },
    {
      name: 'amount',
      title: 'Importo Lavori',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Servizi Svolti',
      type: 'string',
    },
    {
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
    },
    {
      name: 'credits',
      title: 'Crediti & Team Esecutivo',
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

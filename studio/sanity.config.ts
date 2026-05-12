import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'MBA Progetti',

  projectId: 'ws52ogy0',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})

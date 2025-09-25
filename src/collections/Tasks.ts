import type { CollectionConfig } from 'payload'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  auth: true,
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'completed',
      type: 'checkbox',
    },
    {
      name: 'dueDate',
      type: 'date',
    },
    {
      name: 'priority',
      type: 'select',
      options: ['low', 'medium', 'high'],
    },
    {
      name: 'assignee',
      type: 'relationship',
      relationTo: 'users',
    }
  ],
}
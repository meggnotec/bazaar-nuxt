import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.string(),
        author: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        draft: z.boolean().optional(),
      }),
    }),
  },
})

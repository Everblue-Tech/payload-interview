import { getPayload } from 'payload'
import config from '@/payload.config'

import { Task } from '@/payload-types'
import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/**
 * get all of the tasks from the backend API
 */
async function getTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response) throw new Error('response invalid!')

  const tasks = (await response.json())['docs']
  console.log(tasks)

  return tasks
}

export default async function TaskView({ sort }: { sort: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // const [tasks, setTasks] = useState<Task[]>()

  const response = await payload.find({
    collection: 'tasks',
    limit: 1000,
    depth: 0,
  })
  const tasks = response.docs as Task[]

  // sort according to sort prop
  tasks.sort((a, b) => (a.title && b.title ? a.title.localeCompare(b.title) : 0))

  console.log(tasks)
  console.log(sort)

  const taskView = tasks.map((t) => {
    return (
      <Card key={t.id}>
        <CardHeader>{t.title}</CardHeader>
        <CardDescription>{t.description}</CardDescription>
      </Card>
    )
  })
  console.log(taskView)

  return <div>{taskView}</div>
}

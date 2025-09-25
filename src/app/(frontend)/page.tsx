import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React, { useState } from 'react'

import config from '@/payload.config'
import './styles.css'
import NewTaskSheet from '@/components/NewTaskSheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TaskView from '@/components/TaskView'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const sortBy = 'Title'

  console.log(user)

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
            Taskr
          </h2>
          <p className="text-lg">Because every good app name ends in an r</p>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4 gap-2">
          <Select /*onValueChange={(v) => (sortBy = v)}*/>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
          <NewTaskSheet />
        </div>
      </div>
      <div className="flex flex-col py-4">
        <TaskView sort={sortBy}></TaskView>
      </div>
      <div>{/* tasks go here */}</div>
    </div>
  )
}

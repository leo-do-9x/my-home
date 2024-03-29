import { prisma } from '@lib/prisma'
import { capitalizeFirstLetter } from '@lib/helper'
import { getRandomIds } from '@lib/randomWord'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  switch (req.method) {
    case 'POST':
      handlePOST(req, res)
      break
    case 'GET':
      handleGET(req, res)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}

async function handleGET(req, res) {
  const selectBodyLanguage = {
    id: true,
    media: true,
    emotions: {
      select: {
        select: true,
      },
    },
    types: {
      select: {
        select: true,
      },
    },
  }

  const take = Number(req.query.take)
  const skip = Number(req.query.skip)

  let operator = {
    orderBy: {
      id: 'desc',
    },
  }

  const emotions = req.query.emotions

  if (emotions && emotions !== 'undefined') {
    const emotionsSelect = emotions
      ?.split(',')
      .map((emotion) => Number(emotion))

    operator = {
      where: {
        selected: {
          id: { in: emotionsSelect },
        },
      },
    }

    const bodyLanguagesRaw = await prisma.bodyLanguageEmotionsSelect.findMany(
      {
        take,
        skip,
        select: {
          bodyLanguage: {
            select: selectBodyLanguage,
          },
        },
        ...operator,
      }
    )
    const bodyLanguages = bodyLanguagesRaw.map((bl) => {
      return bl.bodyLanguage
    })

    const total = await prisma.bodyLanguageEmotionsSelect.count(operator)

    const pageCount = Math.ceil(total / take)

    return res.json({ bodyLanguages, pageCount, code: 200 })
  }

  if (req.query.page) {
    const itemCount = await prisma.bodyLanguage.count()
    const randomIds = getRandomIds(itemCount, take)

    const questions = await prisma.bodyLanguage.findMany({
      where: {
        id: { in: randomIds },
      },
      select: {
        id: true,
        media: true,
        emotions: {
          select: {
            selected: true,
          },
        },
      },
    })

    return res.json({ questions, code: 200 })
  }

  const total = await prisma.bodyLanguage.count(operator)

  const pageCount = Math.ceil(total / take)

  const bodyLanguages = await prisma.bodyLanguage.findMany({
    take,
    skip: !Number.isNaN(skip) ? skip : undefined,
    ...operator,
    select: selectBodyLanguage,
  })

  return res.json({ bodyLanguages, pageCount, code: 200 })
}

async function handlePOST(req, res) {
  const assignedAt = new Date()
  const createEmotions = [req.body.emotions]?.map((emotion) => {
    if (emotion.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: emotion.value,
            label: capitalizeFirstLetter(emotion.value),
          },
        },
      }
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: emotion.id,
        },
      },
    }
  })

  const createTypes = req.body.types?.map((type) => {
    if (type.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: type.value,
            label: capitalizeFirstLetter(type.value),
          },
        },
      }
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: type.id,
        },
      },
    }
  })

  const bodyLanguage = await prisma.bodyLanguage.create({
    data: {
      media: req.body.media,
      emotions: { create: createEmotions },
      types: { create: createTypes },
    },
  })

  return res.json({ bodyLanguage, code: 201 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}

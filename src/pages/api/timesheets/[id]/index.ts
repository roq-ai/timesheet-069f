import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { timesheetValidationSchema } from 'validationSchema/timesheets';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.timesheet
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTimesheetById();
    case 'PUT':
      return updateTimesheetById();
    case 'DELETE':
      return deleteTimesheetById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTimesheetById() {
    const data = await prisma.timesheet.findFirst(convertQueryToPrismaUtil(req.query, 'timesheet'));
    return res.status(200).json(data);
  }

  async function updateTimesheetById() {
    await timesheetValidationSchema.validate(req.body);
    const data = await prisma.timesheet.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTimesheetById() {
    const data = await prisma.timesheet.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
